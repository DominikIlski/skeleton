import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthController } from './auth.controller';
import { User, UserRepository, UserService } from '../user';

const userRepo = new UserRepository(User.TABLE_NAME);
const userService = new UserService(userRepo);
const authController = new AuthController(userService);

export const authRouter = Router();

authRouter.get(
  '/signup',
  asyncHandler(async (req, res) => {
    await authController.signup(req, res);
  }),
);

authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    await authController.login(req, res);
  }),
);

authRouter.put(
  '/reset-password',
  asyncHandler(async (req, res) => {
    await authController.resetPassword(req, res);
  }),
);
