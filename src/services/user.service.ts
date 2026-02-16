import { User } from '@prisma/client';
import { prisma } from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors';
import { CreateUserDto, UpdateUserDto, ListUsersQuery } from '../validators';

type UserWithoutPassword = Omit<User, 'password'>;

interface PaginatedUsers {
  users: UserWithoutPassword[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const excludePassword = (user: User): UserWithoutPassword => {
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const userService = {
  async findAll(query: ListUsersQuery): Promise<PaginatedUsers> {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { name: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users: users.map(excludePassword),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async findById(id: string): Promise<UserWithoutPassword> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }

    return excludePassword(user);
  },

  async create(data: CreateUserDto): Promise<UserWithoutPassword> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const user = await prisma.user.create({
      data,
    });

    return excludePassword(user);
  },

  async update(id: string, data: UpdateUserDto): Promise<UserWithoutPassword> {
    await this.findById(id);

    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id },
        },
      });

      if (existingUser) {
        throw new ConflictError('User with this email already exists');
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return excludePassword(user);
  },

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await prisma.user.delete({
      where: { id },
    });
  },
};
