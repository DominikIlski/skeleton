import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import UserController from './user.controller';
import DynamoDBTable from '../servieces/DynamoDbTable';
import User from './user.entity';
import UserService from './user.service';

const userRepo = new DynamoDBTable<User>(User.TABLE_NAME);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    await userController.findOne(req, res);
  }),
);

userRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    await userController.findAll(req, res);
  }),
);

userRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    await userController.create(req, res);
  }),
);

userRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    await userController.update(req, res);
  }),
);

userRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await userController.delete(req, res);
  }),
);

export default userRouter;
