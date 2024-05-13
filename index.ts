import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import movieApiRouter from './src/api/router/MovieRouter';
import apiDbSource from './data-source';

async function main() {
  // inithialize database
  await apiDbSource.initialize();

  // create API
  const api = express();

  api.use(morgan('tiny'));
  api.use(express.json());

  dotenv.config();

  api.use('/movie-api', movieApiRouter);

  const port = process.env.PORT || 8200;

  api.listen(port, () => {
    console.log(`Movie API is running on port ${port}`);
  });
}

main();
