import 'reflect-metadata';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();
import './database';

const app = express();

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', 'uploads'))
);

app.use(routes);

export default app;
