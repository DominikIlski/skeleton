import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Request } from 'express-jwt';
import { IAuthController } from '../basicInterfaces';
import { IBasicRouter } from '../basicInterfaces/router.interface';

export class AuthRouter implements IBasicRouter {
  readonly router;

  constructor(private authController : IAuthController) {
    this.router = Router();
  }

  setupRouter() {
    this.router.post(
      '/signup',
      asyncHandler(async (req: Request, res) => {
        await this.authController.signup(req, res);
      }),
    );

    this.router.post(
      '/login',
      asyncHandler(async (req: Request, res) => {
        await this.authController.login(req, res);
      }),
    );

    this.router.put(
      '/reset-password',
      asyncHandler(async (req: Request, res) => {
        await this.authController.resetPassword(req, res);
      }),
    );
    return this.router;
  }

}


