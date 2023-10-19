import { Router } from 'express';
import { Request } from 'express-jwt';
import asyncHandler from 'express-async-handler';
import { User } from './user.entity'; //static field requires this
import { UserController, UserRepository, UserService } from '.';

const userRepo = new UserRepository(User.TABLE_NAME);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

export const userRouter = Router();

userRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res) => {
    await userController.findOne(req, res);
  }),
);

userRouter.get(
  '/',
  asyncHandler(async (req: Request, res) => {
    await userController.findAll(req, res);
  }),
);

userRouter.post(
  '/',
  asyncHandler(async (req: Request, res) => {
    await userController.create(req, res);
  }),
);

userRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res) => {
    await userController.update(req, res);
  }),
);

userRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res) => {
    await userController.delete(req, res);
  }),
);
