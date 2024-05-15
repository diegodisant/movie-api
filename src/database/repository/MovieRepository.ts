import { Service } from 'typedi';
import { Movie } from '../entity/Movie';
import { IBaseRepository } from './BaseRepository';

export interface IMovieRepository extends IBaseRepository<Movie> {}

@Service()
export class MovieRepository implements IMovieRepository {
  async all(): Promise<Movie[]> {
    return await Movie.find();
  }

  async one(id: number): Promise<Movie> {
    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
      throw new Error(`The movie with id: ${id} does not exists`);
    }

    return movie;
  }

  async create(item: Movie): Promise<Movie> {
    return await Movie.create(item).save();
  }

  async update(id: number, item: Movie): Promise<Movie> {
    const movie = await this.one(id);

    Object.assign(movie, item);
    const updatedMovie = await movie.save();

    return updatedMovie;
  }

  async delete(id: number): Promise<boolean> {
    const movie = await this.one(id);

    const movieDeleted = await movie.remove();

    if (!movieDeleted) {
      return false;
    }

    return true;
  }
}
