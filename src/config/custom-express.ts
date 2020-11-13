import 'marko/node-require';
import express from 'express';
import markoExpress from '@marko/express';
import routes from '../app/routes/routes';
import methodOverride from 'method-override';

const app = express();

app.use('/estatico', express.static('src/app/public'));
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

export default app;
