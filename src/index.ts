import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

const api = express();

api.use(morgan('tiny'));
api.use(express.json());

dotenv.config();

const port = process.env.PORT || 8200;

api.listen(port, () => {
  console.log(`Movie API is running on port ${port}`);
});
