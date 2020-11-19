import 'marko/node-require';
import express, {Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import markoExpress from '@marko/express';
import routes from '../app/routes';
import methodOverride from 'method-override';
import error404 from '../app/views/base/erros/404.marko';
import error500 from '../app/views/base/erros/500.marko';

const app = express();

app.use('/static', express.static('src/app/public'));
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride(function (request, response) {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    var method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

app.use(markoExpress());
app.use(routes);

app.use(function(request, response, next) {
  return response.status(404).marko(error404);
});

const errorHandler: ErrorRequestHandler  = (err, request, response, next) => {
  return response.status(500).marko(error500);
}

app.use(errorHandler);

export default app;
