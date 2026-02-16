import { Router } from 'express';
import { userController } from '../controllers';
import { validate } from '../middlewares';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
  listUsersQuerySchema,
} from '../validators';

const router = Router();

router.get(
  '/',
  validate({ query: listUsersQuerySchema }),
  userController.getAll
);

router.get(
  '/:id',
  validate({ params: userIdParamSchema }),
  userController.getById
);

router.post('/', validate({ body: createUserSchema }), userController.create);

router.put(
  '/:id',
  validate({ params: userIdParamSchema, body: updateUserSchema }),
  userController.update
);

router.patch(
  '/:id',
  validate({ params: userIdParamSchema, body: updateUserSchema }),
  userController.update
);

router.delete(
  '/:id',
  validate({ params: userIdParamSchema }),
  userController.delete
);

export { router as userRoutes };
