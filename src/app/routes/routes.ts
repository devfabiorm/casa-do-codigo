import { Router, Response, Request } from 'express';
import { body } from 'express-validator';

import BaseController from '../controllers/baseController';
import BookController from '../controllers/bookController';

const routes = Router();
const baseController = new BaseController();
const bookController = new BookController();

routes.get('/', baseController.Home);

routes.get('/livros', bookController.index);
routes.get('/livros/form', bookController.form);
routes.post('/livros', [
  body('title').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
  body('price').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
],
bookController.create);
routes.get('/livros/form/:id', bookController.show);
routes.put('/livros', bookController.update);
routes.delete('/livros/:id', bookController.remove);

export default routes;