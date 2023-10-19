import { IUserRepository, User } from ".";
import { IUserService } from "./interfaces/user.service.interface";

export class UserService implements IUserService {
  constructor(private databaseRepo: IUserRepository) {
    this.databaseRepo = databaseRepo;
  }

  findOne = async (userId: string) => {
    try {
      const user = await this.databaseRepo.read(userId);
      return user;
    } catch (error) {
      console.error('Error in getUser service:', error);
      throw new Error('Failed to get user');
    }
  };

  findOneByEmail = async (email: string) => {
    try {
      const user = await this.databaseRepo.readByEmail(email);
      return user;
    } catch (error) {
      console.error('Error in getUser service:', error);
      throw new Error('Failed to get user');
    }
  };

  findAll = async () => {
    try {
      const user = await this.databaseRepo.read();
      return user;
    } catch (error) {
      console.error('Error in getUser service:', error);
      throw new Error('Failed to get user');
    }
  };

  create = async (userData: User) => {
    try {
      const newUser = await this.databaseRepo.create(userData);
      return newUser;
    } catch (error) {
      console.error('Error in createUser service:', error);
      throw new Error('Failed to create user');
    }
  };

  update = async (userId: string, userData: User) => {
    try {
      const existingUser = await this.databaseRepo.read(userId);
      if (!existingUser) {
        return null;
      }

      const updatedUser = await this.databaseRepo.update(userId, userData);
      return updatedUser;
    } catch (error) {
      console.error('Error in updateUser service:', error);
      throw new Error('Failed to update user');
    }
  };

  deleteOne = async (userId: string) => {
    try {
      const existingUser = await this.databaseRepo.read(userId);
      if (!existingUser) {
        return null;
      }

      const deletedUser = await this.databaseRepo.delete(userId);
      return deletedUser;
    } catch (error) {
      console.error('Error in deleteUser service:', error);
      throw new Error('Failed to delete user');
    }
  };
}
