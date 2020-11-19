import { Request, Response } from 'express';

import * as Templates from '../views';

export default class BaseController {

  static routes() {
    return {
      home: '/'
    }
  }

  Home(request: Request, response: Response) {
    response.marko(Templates.base.home);
  }
}