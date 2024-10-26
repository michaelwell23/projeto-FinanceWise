import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';

dotenv.config();
import './database';

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', 'uploads'))
);

app.use(express.json());
app.use(routes);

export default app;
