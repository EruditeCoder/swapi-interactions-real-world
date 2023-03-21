import { StarWarsClient } from "../../../utils/starwars.client";
import { StarWarsInfoLookupRepository } from "./star-wars-info-lookup.repository";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";
import { Person } from "../data/person.interface";
import { SingleStarshipResponse } from "../data/starship.interface";
import { Film } from "../data/film.interface";
import { Species } from "../data/species.interface";

export class StarWarsInfoLookupDataSourceRepository implements StarWarsInfoLookupRepository {
  private readonly starWarsClient: StarWarsClient;

  constructor() {
    this.starWarsClient = new StarWarsClient();
  }

  async getPersonDetailsByName(name: string): Promise<Result<Person | ApiError>> {
    try {
      return await this.starWarsClient.getPersonDetailsByName(name);
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getStarshipDetailsById(id: string): Promise<Result<SingleStarshipResponse | ApiError>> {
    try {
      return await this.starWarsClient.getStarshipDetailsById(id);
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getFilmByEpisode(episode: string): Promise<Result<Film | ApiError>> {
    try {
      return await this.starWarsClient.getFilmByEpisode(episode);
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getSpeciesClassificationById(id: string): Promise<Result<{
    name: string,
    classification: string
  } | ApiError>> {
    try {
      const species = await this.starWarsClient.getSpeciesById(id);

      if (species.isFailure) {
        return species;
      }

      const speciesOrError = species.getValue() as Species;

      if (!speciesOrError.name || !speciesOrError.classification) {
        return Result.fail(new ApiError(500,
          'Species is missing required properties: ' + speciesOrError))
      }

      return Result.ok({
        name: speciesOrError.name,
        classification: speciesOrError.classification,
      })

    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getAllPlanetsPopulation(): Promise<Result<number | ApiError>> {
    try {
      return await this.starWarsClient.getAllPlanetsPopulation();
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }
}
