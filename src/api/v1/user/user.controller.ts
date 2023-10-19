import { Request, Response } from 'express';
import ControllerCompatible from '../interfaces/controller.interface';
import User from './user.entity';
import ServiceCompatible from '../interfaces/user.serevice.interface';

class UserController implements ControllerCompatible {
  constructor(private userService: ServiceCompatible<User>) {}

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      const user = await this.userService.findOne(userId);

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
      const userId = req.params.id;

      const user = await this.userService.findOne(userId);

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

export default UserController;
