import { Router } from 'express';

import db from '../../config/database';
import BookDao from '../infra/book-dao';

import ListBooks from '../views/books/list/list.marko';
import FormBook from '../views/books/form/form.marko';

const routes = Router();
const bookDao = new BookDao(db);


routes.get('/', function(request, response) {
  response.send(
    `<html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <h1> Casa do Código </h1>
        </body> 
    </html>`
  );
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

routes.post('/livros', async function(request, response) {
  try {
    const { id, titulo, preco, descricao } = request.body;

    await bookDao.create({ id, titulo, preco, descricao });

    response.redirect('/livros');
  } catch (error) {
    console.log(error)
  }
  
});

routes.put('/livros', async function(request, response) {
  try {
    const { id, titulo, preco, descricao } = request.body;

    console.log(descricao)

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

routes.get('/livros/form/:id', async function(request, response) {
  try {
    const { id } = request.params;

    const book = await bookDao.findById(Number(id));

    response.marko(FormBook, { book });
  } catch (error) {
    console.log(error);
  }
});

export default routes;