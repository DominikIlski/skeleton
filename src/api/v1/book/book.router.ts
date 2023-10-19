import { Router, Response } from 'express';
import { Request } from 'express-jwt';

import asyncHandler from 'express-async-handler';
import { DynamoDBTable } from '../services/DynamoDbTable';
import { Book } from './book.entity';
import { BookController, BookService } from '.';

const bookRepo = new DynamoDBTable<Book>(Book.TABLE_NAME);
const bookService = new BookService(bookRepo);
const bookController = new BookController(bookService);

export const bookRouter = Router();

bookRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body.userId);
    await bookController.findOne(req, res);
  }),
);

bookRouter.get(
  '/',
  asyncHandler(async (req: Request, res) => {
    console.log(req.body.userId);
    await bookController.findAll(req, res);
  }),
);

bookRouter.post(
  '/',
  asyncHandler(async (req: Request, res) => {
    console.log(req.body);
    await bookController.create(req, res);
  }),
);

bookRouter.put(
  '/:id',
  asyncHandler(async (req: Request, res) => {
    await bookController.update(req, res);
  }),
);

bookRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res) => {
    await bookController.delete(req, res);
  }),
);
