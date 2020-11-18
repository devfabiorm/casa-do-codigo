import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import BookDao from '../infra/bookDao';
import db from '../../config/database';

import ListBooks from '../views/books/list/list.marko';
import FormBook from '../views/books/form/form.marko';

export default class BookController {

  async index(request: Request, response: Response) {
    try {
      const bookDao = new BookDao(db);
      const books = await bookDao.list();

      response.marko(ListBooks, { books });
    } catch (error) {
      console.log(error);
    }
  }

  form(request: Request, response: Response) {
    response.marko(FormBook, { book: {} });
  }

  async create(request: Request, response: Response) {
    try {
      //console.log(request.body);
      const errors = validationResult(request);

      if(!errors.isEmpty()) {
        return response.marko(FormBook, { book: {}, validationErrors: errors.array() });
      }

      const bookDao = new BookDao(db);

      const { title, price, description } = request.body;
      await bookDao.create({ title, price, description });

      response.redirect('/livros');
    } catch (error) {
      console.log(error);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const bookDao = new BookDao(db);
      const { id, title, price, description } = request.body;

      await bookDao.update({ id, title, price, description });

      response.redirect('/livros');
    } catch (error) {
      console.log(error);
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const bookDao = new BookDao(db);
      const { id } = request.params;

      await bookDao.remove(Number(id));
      response.status(200).end();
    } catch (error) {
      console.log(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const bookDao = new BookDao(db);
      const { id } = request.params;

      const book = await bookDao.findById(Number(id));

      if(book) {
        return response.marko(FormBook, { book });
      } else {
        next('Book not found');
      }
    } catch (error) {
      console.log(error);
    }
  }
}