import Book from './book.entity';
import ServiceCompatible from '../interfaces/service.interface';
import DatabaseCompatible from '../interfaces/database.interface';

class BookService implements ServiceCompatible<Book> {
  constructor(private databaseRepo: DatabaseCompatible<Book>) {
    this.databaseRepo = databaseRepo;
  }
  findOne = async (bookId: string) => {
    try {
      const book = await this.databaseRepo.read(bookId);
      return book;
    } catch (error) {
      console.error('Error in getBook service:', error);
      throw new Error('Failed to get book');
    }
  };

  findAll = async () => {
    try {
      const book = await this.databaseRepo.read();
      return book;
    } catch (error) {
      console.error('Error in getBook service:', error);
      throw new Error('Failed to get book');
    }
  };

  create = async (bookData: Book) => {
    try {
      const newBook = await this.databaseRepo.create(bookData);
      return newBook;
    } catch (error) {
      console.error('Error in createBook service:', error);
      throw new Error('Failed to create book');
    }
  };

  update = async (bookId: string, bookData: Book) => {
    try {
      const existingBook = await this.databaseRepo.read(bookId);
      if (!existingBook) {
        throw new Error('Book not found');
      }

      const updatedBook = await this.databaseRepo.update(bookId, bookData);
      return updatedBook;
    } catch (error) {
      console.error('Error in updateBook service:', error);
      throw new Error('Failed to update book');
    }
  };

  deleteOne = async (bookId: string) => {
    try {
      const existingBook = await this.databaseRepo.read(bookId);
      if (!existingBook) {
        throw new Error('Book not found');
      }

      const deletedBook = await this.databaseRepo.delete(bookId);
      return deletedBook;
    } catch (error) {
      console.error('Error in deleteBook service:', error);
      throw new Error('Failed to delete Book');
    }
  };
}

export default BookService;
