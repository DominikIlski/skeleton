import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express-serve-static-core';
import { IBasicRouter } from '../basicInterfaces';
import { BookController } from '.';

export class BookRouter implements IBasicRouter {
  readonly router;

  constructor(private controller: BookController) {
    this.router = Router();
  }

  setupRouter(): Router {
    this.router.get(
      '/:id',
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.findOne(req, res);
      }),
    );

    this.router.get(
      '/',
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.findAll(req, res);
      }),
    );

    this.router.post(
      '/',
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.create(req, res);
      }),
    );

    this.router.put(
      '/:id',
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.update(req, res);
      }),
    );

    this.router.delete(
      '/:id',
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.delete(req, res);
      }),
    );
    return this.router;
  }
}
