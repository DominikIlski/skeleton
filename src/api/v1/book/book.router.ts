import { Router } from 'express';
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
  asyncHandler(async (req, res) => {
    await bookController.findOne(req, res);
  }),
);

bookRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    await bookController.findAll(req, res);
  }),
);

bookRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    await bookController.create(req, res);
  }),
);

bookRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    await bookController.update(req, res);
  }),
);

bookRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await bookController.delete(req, res);
  }),
);
