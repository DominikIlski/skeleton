import { Request, Response } from 'express';
import { IBasicController, IBasicService } from '../basicInterfaces';
import { User } from '.';

export class UserController implements IBasicController {
  constructor(private userService: IBasicService<User>) {}

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      const user = await this.userService.findOne(userId);
      delete user?.hash;
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();

      if (!users) {
        res.status(404).json({ message: 'User not found' });
      } else {
        const usersWithoutHash = users.map((us) => ({
          ...us,
          hash: null,
        }));
        res.status(200).json(usersWithoutHash);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const newUser = await this.userService.create(new User(name, email));

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const updatedData = req.body;

      const updatedUser = await this.userService.update(userId, updatedData);

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      const result = await this.userService.deleteOne(userId);

      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
