import express from 'express';
import 'dotenv/config';
import {
  User,
  UserController,
  UserRepository,
  UserRouter,
  UserService,
} from './api/v1/user/';
import { Book, BookController, BookRouter, BookService } from './api/v1/book/';
import { AuthController, AuthRouter } from './api/v1/auth/';
import { authMiddleware, unlessPaths } from './api/v1/auth/';
import { DynamoDBTable } from './api/v1/services/DynamoDbTable';
import { errorMiddleware } from './api/v1/middlware';

const port = Number(process.env.PORT || 3000);

async function init() {
  const app = express();
  const userService = new UserService(new UserRepository(User.TABLE_NAME));
  const bookController = new BookController(
    new BookService(new DynamoDBTable<Book>(Book.TABLE_NAME)),
  );
  const userController = new UserController(userService);
  const authController = new AuthController(userService);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    authMiddleware.required.unless({
      path: unlessPaths,
    }),
  );
  app.use('/api/v1/users', new UserRouter(userController).setupRouter());
  app.use('/api/v1/books', new BookRouter(bookController).setupRouter());
  app.use('/api/v1/auth', new AuthRouter(authController).setupRouter());
  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
init();
