import { Router } from 'express';

import Template from '../views/livros/lista/lista.marko';

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
  response.marko(Template);
});

export default routes;