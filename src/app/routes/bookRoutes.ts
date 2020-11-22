import { Router } from 'express';

import Book from '../models/book';
import BookController from '../controllers/bookController';
import BaseController from '../controllers/baseController';

const bookRoutes = Router();
const bookController = new BookController();
const routesForBooks = BookController.routes();
const routesForBase = BaseController.routes();

bookRoutes.use(routesForBooks.authorizeds, function(request, response, next) {
  if(request.isAuthenticated()) {
    next();
  } else {
    response.redirect(routesForBase.login);
  }
});

bookRoutes.get(routesForBooks.list, bookController.index);
bookRoutes.get(routesForBooks.create, );
bookRoutes.get(routesForBooks.edit, bookController.show);
bookRoutes.delete(routesForBooks.remove, bookController.remove);
bookRoutes.route(routesForBooks.create)
  .get(bookController.form)
  .post(Book.validations(), bookController.create)
  .put(bookController.update);

export default bookRoutes;