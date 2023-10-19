import { Request, Response } from 'express';
import ControllerCompatible from '../interfaces/controller.interface';
import Book from './book.entity';
import ServiceCompatible from '../interfaces/service.interface';

class BookController implements ControllerCompatible {
  constructor(private bookService: ServiceCompatible<Book>) {}

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const bookId = req.params.id;

      const book = await this.bookService.findOne(bookId);

      if (!book) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const bookId = req.params.id;

      const book = await this.bookService.findOne(bookId);

      if (!book) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {``
    try {
      const { name, pages } = req.body;
      const newBook = await this.bookService.create(new Book(name, pages));

      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const bookId = req.params.id;
      const updatedData = req.body;

      const updatedBook = await this.bookService.update(bookId, updatedData);

      if (!updatedBook) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.status(200).json(updatedBook);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const bookId = req.params.id;

      const result = await this.bookService.deleteOne(bookId);

      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default BookController;
