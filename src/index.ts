import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { MovieRouter } from './api/router/MovieRouter';

const api = express();

api.use(morgan('tiny'));
api.use(express.json());

dotenv.config();

const movieRouter = new MovieRouter();

movieRouter.bind(api);

const port = process.env.PORT || 8200;

api.listen(port, () => {
  console.log(`Movie API is running on port ${port}`);
});
