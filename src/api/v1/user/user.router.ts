import { Router } from 'express';
import UserController from './user.controller';
import DynamoDBTable from '../servieces/DynamoDbTable';
import User from './user.entity';
import UserService from './user.service';

const userRepo = DynamoDBTable.getInstance<User>(User.TABLE_NAME);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.get('/:id', (req, res) => {
  userController.findOne(req, res);
});

userRouter.get('/', (req, res) => {
  userController.findAll(req, res);
});

userRouter.post('/', (req, res) => {
  userController.create(req, res);
});

userRouter.put('/:id', (req, res) => {
  userController.update(req, res);
});

userRouter.delete('/:id', (req, res) => {
  userController.delete(req, res);
});

export default userRouter;
