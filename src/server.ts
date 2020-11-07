import express from 'express';

const app = express();

app.get('/', function(request, response) {
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

app.get('/livros', function(request, response) {
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

app.listen(3000, function() {
  console.log(`Servidor rodando na porta 3000`);
});