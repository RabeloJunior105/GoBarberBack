import express from 'express';
import routes from './routes';
import 'reflect-metadata';
import './database';
import UploadConfig from './config/upload';

const app = express();

app.use(express.json());

app.use(routes);

app.use('/files', express.static(UploadConfig.directory));

app.listen(3333, () => {
  console.log('server started');
});
