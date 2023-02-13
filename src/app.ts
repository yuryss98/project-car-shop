import express from 'express';
import errorHandler from './middlewares/ErrorHandle';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/cars', routes.CarRoutes);
app.use(errorHandler);

export default app;
