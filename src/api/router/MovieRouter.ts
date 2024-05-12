import { Movie } from "../../database/entity/Movie";
import { MovieController } from "../controller/MovieController";
import { BaseRouter } from "./BaseRouter";

export class MovieRouter extends BaseRouter<Movie> {
  name: string = 'movie-api';

  constructor() {
    super(new MovieController());
  }
}
