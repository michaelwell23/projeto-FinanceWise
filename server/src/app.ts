import 'reflect-metadata';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes';

dotenv.config();
import './database';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', 'uploads'))
);

app.use(routes);

export default app;
