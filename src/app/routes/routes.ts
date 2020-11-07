import { Router } from 'express';

const routes = Router();

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
  response.send(
    `<html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <h1> Listagem de Livros </h1>
        </body> 
    </html>`
  );
});

export default routes;