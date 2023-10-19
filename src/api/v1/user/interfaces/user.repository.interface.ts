import { User } from '..';
import { IBasicRepository } from '../../basicInterfaces';

export interface IUserRepository extends IBasicRepository<User> {
  readByEmail(emial: string): Promise<User | null>;
}
