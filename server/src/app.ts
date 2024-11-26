import 'reflect-metadata';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';

import routes from './routes';

import './database';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', 'uploads'))
);
app.use(routes);

export default app;
