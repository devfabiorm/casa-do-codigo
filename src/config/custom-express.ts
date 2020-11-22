import 'marko/node-require';
import express, { ErrorRequestHandler } from 'express';
import markoExpress from '@marko/express';
import routes from '../app/routes';
import methodOverride from 'method-override';
import session from 'express-session';
import passport, { use } from 'passport';
import { v4 as uuidv4 } from 'uuid';
import customPassport from './sessionAuthentication';

import * as Templates from '../app/views';

const app = express();

app.use('/static', express.static('src/app/public'));
app.use(session({
  secret: 'node alura',
  genid: function(request) {
    return uuidv4();
  },
  resave: false,
  saveUninitialized: false
}));
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
app.use(passport.initialize());
app.use(passport.session());

app.use(function(request, response, next) {
  request.passport = customPassport;
  next();
});

app.use(routes);

app.use(function(request, response, next) {
  return response.status(404).marko(Templates.base.error404);
});

const errorHandler: ErrorRequestHandler  = (err, request, response, next) => {
  return response.status(500).marko(Templates.base.error500);
}

app.use(errorHandler);

export default app;
