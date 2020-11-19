import { Router } from 'express';

import Book from '../models/book';
import BookController from '../controllers/bookController';

const baseRoutes = Router();
const bookController = new BookController();
const bookRoutes = BookController.routes();

baseRoutes.get(bookRoutes.list, bookController.index);
baseRoutes.get(bookRoutes.create, );
baseRoutes.get(bookRoutes.edit, bookController.show);
baseRoutes.delete(bookRoutes.remove, bookController.remove);
baseRoutes.route(bookRoutes.create)
  .get(bookController.form)
  .post(Book.validations(), bookController.create)
  .put(bookController.update);

export default baseRoutes;