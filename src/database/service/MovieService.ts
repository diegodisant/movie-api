import { Movie } from '../entity/Movie';
import { MovieRepository } from '../repository/MovieRepository';
import { BaseService } from './BaseService';

export class MovieService extends BaseService<Movie> {
  constructor() {
    super(new MovieRepository());
  }
}
