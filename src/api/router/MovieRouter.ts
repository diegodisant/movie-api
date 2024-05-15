import express from 'express';
import {
  all,
  one,
  create,
  update,
  remove,
} from '../controller/MovieController';

const router = express.Router();

router.get('/', all);
router.get('/:id', one);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
