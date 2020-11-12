import 'marko/node-require';
import express from 'express';
import markoExpress from '@marko/express';
import routes from '../app/routes/routes';

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(markoExpress());
app.use(routes);

export default app;
