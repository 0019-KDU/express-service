import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/config/database';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('User Routes', () => {
  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedpassword',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/users', () => {
    it('should return a list of users', async () => {
      mockPrisma.user.findMany.mockResolvedValue([mockUser]);
      mockPrisma.user.count.mockResolvedValue(1);

      const response = await request(app).get('/api/v1/users');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });

    it('should support pagination parameters', async () => {
      mockPrisma.user.findMany.mockResolvedValue([mockUser]);
      mockPrisma.user.count.mockResolvedValue(1);

      const response = await request(app)
        .get('/api/v1/users')
        .query({ page: 1, limit: 5 });

      expect(response.status).toBe(200);
      expect(response.body.meta.page).toBe(1);
      expect(response.body.meta.limit).toBe(5);
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a user by id', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app).get(`/api/v1/users/${mockUser.id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(mockUser.id);
    });

    it('should return 404 for non-existent user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app).get(
        '/api/v1/users/123e4567-e89b-12d3-a456-426614174001'
      );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it('should return 422 for invalid UUID', async () => {
      const response = await request(app).get('/api/v1/users/invalid-id');

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue(mockUser);

      const response = await request(app).post('/api/v1/users').send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });

    it('should return 422 for invalid input', async () => {
      const response = await request(app).post('/api/v1/users').send({
        email: 'invalid-email',
        name: 'T',
        password: 'short',
      });

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
    });

    it('should return 409 for duplicate email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app).post('/api/v1/users').send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update a user', async () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.findFirst.mockResolvedValue(null);
      mockPrisma.user.update.mockResolvedValue(updatedUser);

      const response = await request(app)
        .put(`/api/v1/users/${mockUser.id}`)
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Updated Name');
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.delete.mockResolvedValue(mockUser);

      const response = await request(app).delete(
        `/api/v1/users/${mockUser.id}`
      );

      expect(response.status).toBe(204);
    });
  });
});
