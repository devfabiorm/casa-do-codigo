import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import BookDao from '../infra/bookDao';
import db from '../../config/database';

import * as Templates from '../views';

export default class BookController {

  static routes() {
    return {
      list: '/livros',
      create: '/livros/form',
      edit: '/livros/form/:id',
      remove: '/livros/:id'
    }
  }

  async index(request: Request, response: Response) {
    try {
      const bookDao = new BookDao(db);
      const books = await bookDao.list();

      response.marko(Templates.books.list, { books });
    } catch (error) {
      console.log(error);
    }
  }

  form(request: Request, response: Response) {
    response.marko(Templates.books.form, { book: {} });
  }

  async create(request: Request, response: Response) {
    try {
      //console.log(request.body);
      const errors = validationResult(request);

      if(!errors.isEmpty()) {
        return response.marko(Templates.books.form, { book: {}, validationErrors: errors.array() });
      }

      const bookDao = new BookDao(db);

      const { title, price, description } = request.body;
      await bookDao.create({ title, price, description });

      response.redirect(BookController.routes().list);
    } catch (error) {
      console.log(error);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const bookDao = new BookDao(db);
      const { id, title, price, description } = request.body;

      await bookDao.update({ id, title, price, description });

      response.redirect(BookController.routes().list);
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
        return response.marko(Templates.books.form, { book });
      } else {
        next('Book not found');
      }
    } catch (error) {
      console.log(error);
    }
  }
}