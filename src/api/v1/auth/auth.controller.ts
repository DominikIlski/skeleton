import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User, IUserService } from '../user';
import { IAuthController } from '../basicInterfaces';
import { signUserToken } from './utils';

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthController implements IAuthController {
  constructor(private userService: IUserService) {}

  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!email || !password ) {
        return res.status(400).json({ message: 'Missing email or password' });
      }

      const existingUser = await this.userService.findOneByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User(name, email, hashedPassword);

      if (!JWT_SECRET) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      await this.userService.create(user);

      const token = signUserToken(user.id);

      res.status(201).json({ token, userId: user.id });
    } catch (error) {
      console.error('Error in signup:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.userService.findOneByEmail(email);

      if (!user || !password) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const passwordMatch = await bcrypt.compare(password, user?.hash || '');

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      if (!JWT_SECRET) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      const token = signUserToken(user.id);

      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, password, newPassword } = req.body;

      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user?.hash || '');

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const hash = await bcrypt.hash(newPassword, 10);

      await this.userService.update(user.id, {
        ...user,
        hash,
      });
      const token = signUserToken(user.id);

      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
