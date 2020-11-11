import { Router } from 'express';

import bd from '../../config/database';
import Template from '../views/livros/lista/lista.marko';

const routes = Router();

export interface Product {
  id: number;
  titulo: string;
}

const livros: Product[] = [];

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
  
routes.get('/livros', function(request, response) {
  bd.all('SELECT * FROM livros', function(err, rows) {
    response.marko(Template, { livros: rows });
  });

});

export default routes;