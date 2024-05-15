import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import movieApiRouter from './src/api/router/MovieRouter';
import apiDbSource from './data-source';
import serverless from 'serverless-http';
import { apiLogger } from './src/api/Log/Logger';

apiDbSource
  .initialize()
  .then(() => {
    apiLogger.info('database connected successfuly');
  })
  .catch((err) => {
    apiLogger.error('unable to connect to database', { error: err });
  });

// create API
const api = express();

api.use(morgan('tiny'));
api.use(express.json());

dotenv.config();

api.use('/movie-api', movieApiRouter);

const port = process.env.PORT || 8200;

api.listen(port, () => {
  apiLogger.info(`Movie API is running at port: ${port}`);
});

export default serverless(api);
