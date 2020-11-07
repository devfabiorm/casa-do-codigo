import express from 'express';
import routes from '../app/routes/routes';

const app = express();
app.use(routes);

export default app;