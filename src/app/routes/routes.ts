import { Router, Response, Request } from 'express';
import { body, validationResult } from 'express-validator';

import db from '../../config/database';
import BookDao from '../infra/book-dao';

import Home from '../views/base/home/home.marko';
import ListBooks from '../views/books/list/list.marko';
import FormBook from '../views/books/form/form.marko';

const routes = Router();
const bookDao = new BookDao(db);


routes.get('/', function(request, response) {
  response.marko(Home);
});
  
routes.get('/livros', async function(request, response) {
  
  try {
    const books = await bookDao.list();

    response.marko(ListBooks, { books })
  }catch(err) {
    console.log(err)
  }
});

routes.get('/livros/form', function(request, response) {
  response.marko(FormBook, { book: {} });
});

routes.post('/livros', [
  body('titulo').isLength({ min: 5 }).withMessage('O título precisar ter no mínimo 5 caracteres'),
  body('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
], async function(request: Request, response: Response) {
  try {
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
      return response.marko(FormBook, { book: request.body, validationErrors: errors.array() });
    }

    const { id, titulo, preco, descricao } = request.body;

    await bookDao.create({ id, titulo, preco, descricao });

    response.redirect('/livros');
  } catch (error) {
    console.log(error);
  }
  
});

routes.get('/livros/form/:id', function(request, response, next) {
  const { id } = request.params;

  bookDao.findById(Number(id)).then(res => {
    if(res) {
      response.marko(FormBook, { book: res });
    }else {
      next('Book not found')
    }
  })
  // .catch(err => console.log(err));
  // try {
  //   const { id } = request.params;

  //   const book = await bookDao.findById(Number(id));

  //   response.marko(FormBook, { book });
  // } catch (error) {
  //   console.log('cai aqui')
  //   console.log(error);
  // }
});

routes.put('/livros', async function(request, response) {
  try {
    const { id, titulo, preco, descricao } = request.body;

    await bookDao.update({ id, titulo, preco, descricao });

    response.redirect('/livros');
  } catch (error) {
    console.log(error)
  }
  
});

routes.delete('/livros/:id', async function(request, response) {
  try {
    const { id } = request.params;

    await bookDao.remove(Number(id));
    response.status(200).end();
  } catch (error) {
    console.log(error);
  }
});


export default routes;