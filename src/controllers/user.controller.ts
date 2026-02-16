import { Request, Response } from 'express';
import { userService } from '../services';
import { asyncHandler, sendSuccess, sendCreated, sendNoContent } from '../utils';
import {
  CreateUserDto,
  UpdateUserDto,
  UserIdParam,
  ListUsersQuery,
} from '../validators';

export const userController = {
  getAll: asyncHandler(
    async (req: Request<object, object, object, ListUsersQuery>, res: Response) => {
      const result = await userService.findAll(req.query);
      sendSuccess(res, result.users, 'Users retrieved successfully', 200, {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      });
    }
  ),

  getById: asyncHandler(
    async (req: Request<UserIdParam>, res: Response) => {
      const user = await userService.findById(req.params.id);
      sendSuccess(res, user, 'User retrieved successfully');
    }
  ),

  create: asyncHandler(
    async (req: Request<object, object, CreateUserDto>, res: Response) => {
      const user = await userService.create(req.body);
      sendCreated(res, user, 'User created successfully');
    }
  ),

  update: asyncHandler(
    async (req: Request<UserIdParam, object, UpdateUserDto>, res: Response) => {
      const user = await userService.update(req.params.id, req.body);
      sendSuccess(res, user, 'User updated successfully');
    }
  ),

  delete: asyncHandler(
    async (req: Request<UserIdParam>, res: Response) => {
      await userService.delete(req.params.id);
      sendNoContent(res);
    }
  ),
};
