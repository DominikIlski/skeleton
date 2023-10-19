import { v4 as uuidv4 } from 'uuid';

export class Book {
  static TABLE_NAME = 'books';

  id: string;
  name: string;
  pages: number;

  constructor(name: string, pages: number, id?: string) {
    this.id = id || uuidv4();
    this.name = name;
    this.pages = pages;
  }
}
