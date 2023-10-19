import { v4 as uuidv4 } from 'uuid';

class User {
  static TABLE_NAME = 'User';

  constructor(
    private name: string,
    private email: string,
    private hash?: string,
    private id?: string,
  ) {
    this.id = uuidv4();
  }
}
export default User;