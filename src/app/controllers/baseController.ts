import { Request, Response } from 'express';

import * as Templates from '../views';

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
    response.marko(Templates.base.login)
  }

  SignIn(request: Request, response: Response) {

  }
}