import 'express-async-errors';
import cors from 'cors';
import express, { type Express } from 'express';

import api from './api/';
import errorHandler from './middlewares/error-handler';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(api);

app.use(errorHandler);

export default app;
