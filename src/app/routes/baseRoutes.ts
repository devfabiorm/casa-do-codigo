import { Router } from 'express';

import BaseController from '../controllers/baseController';

const baseRoutes = Router();
const baseController = new BaseController();
const baseForBase = BaseController.routes();

baseRoutes.get(baseForBase.home, baseController.Home);

export default baseRoutes;



