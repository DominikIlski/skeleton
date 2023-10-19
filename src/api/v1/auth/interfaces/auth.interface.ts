import { Request, Response } from 'express';

export interface IAuthController {
  signup(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
  resetPassword(req: Request, res: Response): void; // Add a method for password reset
}

