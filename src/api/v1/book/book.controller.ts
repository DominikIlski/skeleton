import { Request, Response } from 'express';
import { IBasicController, IBasicService } from '../basicInterfaces';
import { Book } from '.';

export class BookController implements IBasicController {
  constructor(private bookService: IBasicService<Book>) {}

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

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, pages } = req.body;

      if (name && pages) {
        const newBook = await this.bookService.create(new Book(name, pages));
        res.status(201).json(newBook);
      } else {
        res.status(400).json({ message: 'Invalid data' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const bookId = req.params.id;
      const { name, pages } = req.body;
      const updatedBook = await this.bookService.update(
        bookId,
        new Book(name, pages, bookId),
      );

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
