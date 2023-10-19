import { int } from 'aws-sdk/clients/datapipeline';
import { v4 as uuidv4 } from 'uuid';

class Book {
  static TABLE_NAME = 'Book';

  constructor(
    private name: string,
    private pages: int,
    private id?: string,
  ) {
    this.id = uuidv4();
  }
}
export default Book;
