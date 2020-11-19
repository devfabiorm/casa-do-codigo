import { Router } from 'express';

import BaseController from '../controllers/baseController';

const baseRoutes = Router();
const baseController = new BaseController();
const routesForBase = BaseController.routes();

baseRoutes.get(routesForBase.home, baseController.Home);
baseRoutes.get(routesForBase.login, baseController.LogIn);
baseRoutes.post(routesForBase.login, baseController.SignIn);

export default baseRoutes;



