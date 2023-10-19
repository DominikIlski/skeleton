import { int } from 'aws-sdk/clients/datapipeline';
import { v4 as uuidv4 } from 'uuid';

export class Book {
  static TABLE_NAME = 'books';

  constructor(
    private name: string,
    private pages: int,
    private id?: string,
  ) {
    this.id = uuidv4();
  }
}
