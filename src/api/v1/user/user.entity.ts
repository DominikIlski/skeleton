import { v4 as uuidv4 } from 'uuid';

class User {
  static TABLE_NAME = 'User';

  constructor(
    private id: string,
    private name: string,
    private email: string,
    private hash: string,
  ) {
    this.id = uuidv4();
  }
}
export default User;