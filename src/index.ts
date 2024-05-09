import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

const api = express();

api.use(bodyParser.json());

dotenv.config();

const port = process.env.PORT || 8200;

api.listen(port, () => {
  console.log(`Movie API is running on port ${port}`);
});
