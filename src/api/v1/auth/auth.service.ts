import { IBasicRepository, IBasicService } from "../basicInterfaces";
import { User } from "../user";


export class UserService implements IBasicService<User> {
  constructor(private databaseRepo: IBasicRepository<User>) {
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
        throw new Error('User not found');
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
        throw new Error('User not found');
      }

      const deletedUser = await this.databaseRepo.delete(userId);
      return deletedUser;
    } catch (error) {
      console.error('Error in deleteUser service:', error);
      throw new Error('Failed to delete user');
    }
  };
}

