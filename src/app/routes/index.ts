import { Router } from 'express';
import baseRoutes from './baseRoutes';
import bookRoutes from './bookRoutes';

const routes = Router();

routes.use(baseRoutes);
routes.use(bookRoutes);

export default routes;