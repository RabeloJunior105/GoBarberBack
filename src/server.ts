import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import './database';
import UploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(UploadConfig.directory));
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return (res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  }));
});

app.listen(3333, () => {
  console.log('server started');
});
