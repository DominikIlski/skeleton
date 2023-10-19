import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Request } from 'express-serve-static-core';
import { IBasicRouter } from '../basicInterfaces';
import { UserController } from '.';

export class UserRouter implements IBasicRouter {
  readonly router;

  constructor(private userController: UserController) {
    this.router = Router()
  }

  public setupRouter(): Router {

    this.router.get(
      '/:id',
      asyncHandler(async (req: Request, res) => {
        await this.userController.findOne(req, res);
      }),
    );

    this.router.get(
      '/',
      asyncHandler(async (req: Request, res) => {
        await this.userController.findAll(req, res);
      }),
    );

    this.router.post(
      '/',
      asyncHandler(async (req: Request, res) => {
        await this.userController.create(req, res);
      }),
    );

    this.router.put(
      '/:id',
      asyncHandler(async (req: Request, res) => {
        await this.userController.update(req, res);
      }),
    );

    this.router.delete(
      '/:id',
      asyncHandler(async (req: Request, res) => {
        await this.userController.delete(req, res);
      }),
    );

    return this.router;
  }
}
