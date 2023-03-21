import { ApiError } from "../../../utils/shared/api-error";
import { Result } from "../../../utils/shared/result";
import { Person } from "../data/person.interface";
import { SingleStarshipResponse } from "../data/starship.interface";
import { Film } from "../data/film.interface";

export interface StarWarsInfoLookupRepository {
  getPersonDetailsByName(name: string): Promise<Result<Person | ApiError>>;

  getStarshipDetailsById(id: string): Promise<Result<SingleStarshipResponse | ApiError>>;

  getFilmByEpisode(episode: string): Promise<Result<Film | ApiError>>;

  getSpeciesClassificationById(id: string): Promise<Result<{
    name: string,
    classification: string
  } | ApiError>>;

  getAllPlanetsPopulation(): Promise<Result<number | ApiError>>
}
