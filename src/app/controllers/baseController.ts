import { Request, Response } from 'express';

import Home from '../views/base/home/home.marko';

export default class BaseController {

  Home(request: Request, response: Response) {
    response.marko(Home);
  }
}