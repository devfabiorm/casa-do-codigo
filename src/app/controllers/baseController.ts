import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
//import passport from 'passport';

import * as Templates from '../views';
import BookController from './bookController';
import { User } from '../infra/userDao';
//import '../../config/sessionAuthentication';

export default class BaseController {

  static routes() {
    return {
      home: '/',
      login: '/login'
    }
  }

  Home(request: Request, response: Response) {
    response.marko(Templates.base.home);
  }

  LogIn(request: Request, response: Response) {
    response.marko(Templates.base.login);
  }

  SignIn(request: Request, response: Response, next: NextFunction) {
    const { passport } = request;
    passport.authenticate('local', (err: Error, user: User, info: IVerifyOptions) => {
      if(info) {
        console.log('info')
        return response.marko(Templates.base.login);
      }

      if(err) {
        console.log('erro')
        return next(err);
      }

      request.logIn(user, (err) => {
        if(err) next(err);

        return response.redirect(BookController.routes().list);
      });
    })(request, response, next);
  }
}