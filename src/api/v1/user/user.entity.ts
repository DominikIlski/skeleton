import { v4 as uuidv4 } from 'uuid';
export class User {
  static TABLE_NAME = 'users';

  id: string;
  name: string;
  email: string;
  hash: string | undefined;

  constructor(name: string, email: string, hash?: string, id?: string) {
    this.id = id || uuidv4();
    this.name = name;
    this.email = email;
    this.hash = hash;
  }
}
