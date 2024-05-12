import { Movie } from "../../database/entity/Movie";
import { MovieService } from "../../database/service/MovieService";
import { BaseController } from "./BaseController";

export class MovieController extends BaseController<Movie> {
  constructor() {
    super(new MovieService());
  }
  
}
