import axios, { AxiosInstance, AxiosError } from 'axios';
import { Person } from "../aggregate/starwars-info/data/person.interface";
import { Result } from "./shared/result";
import { ApiError } from "./shared/api-error";
import { SingleStarshipResponse, Starship } from "../aggregate/starwars-info/data/starship.interface";
import { Film } from "../aggregate/starwars-info/data/film.interface";
import { Species } from "../aggregate/starwars-info/data/species.interface";
import { Planet } from "../aggregate/starwars-info/data/planet.interface";

interface ListResponse {
  count: number,
  next: string,
  previous: string,
  results: []
}

export class StarWarsClient {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://swapi.dev/api'
    })
  }

  async getPersonDetailsByName(name: string): Promise<Result<Person | ApiError>> {
    try {
      let response: ListResponse;
      let foundPerson: Person;
      let nextPage;

      while (true) {
        response = (await this.axios.get('/people/', {
          params: {
            page: nextPage
          }
        })).data as ListResponse;

        if (!response.results || response.results.length === 0) {
          break;
        }

        for (const person of response.results as Person[]) {
          if (person.name.toLowerCase().trim() === name.toLowerCase().trim()) {
            foundPerson = person;

            if (!foundPerson.starships || foundPerson.starships.length === 0) {
              return Result.fail(new ApiError(404, 'no corresponding starships for, ' + foundPerson.name))
            }

            return Result.ok(foundPerson);
          }
        }

        if (!response.next) break;

        nextPage = nextPage ? nextPage + 1 : 2;
      }

      return Result.fail(new ApiError(404, 'Person not found: ' + name));
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getStarshipDetailsById(id: string): Promise<Result<SingleStarshipResponse | ApiError>> {
    try {
      const response = (await this.axios.get(`/starships/${id}`)).data as Starship;

      if (response) {
        return Result.ok({
          starshipName: response.name,
          info: response
        })
      }

      return Result.fail(new ApiError(404, 'Starship of id: ' + id + ' not found'));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;

        if (axiosError.response) {
          const {status, data} = axiosError.response;
          const errorMessage = typeof data === 'string' ? data : JSON.stringify(data);

          return Result.fail(new ApiError(status, `Error: ${errorMessage}`));
        }
      }

      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getFilmByEpisode(episode: string): Promise<Result<Film | ApiError>> {
    try {
      const response = (await this.axios.get(`/films`)).data as ListResponse;

      const films = response.results as Film[];

      if (!films) {
        return Result.fail(new ApiError(404, 'No films found'));
      }

      for (const film of films) {
        if (film.episode_id.toString() === episode) {
          return Result.ok(film);
        }
      }

      return Result.fail(new ApiError(404, 'Episode ' + episode + ' not found'));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;

        if (axiosError.response) {
          const {status, data} = axiosError.response;
          const errorMessage = typeof data === 'string' ? data : JSON.stringify(data);

          return Result.fail(new ApiError(status, `Error: ${errorMessage}`));
        }
      }

      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getSpeciesById(id: string): Promise<Result<Species | ApiError>> {
    try {
      const species = (await this.axios.get(`/species/${id}`)).data as Species;

      if (!species) {
        return Result.fail(new ApiError(404, 'No species found for id of ' + id));
      }

      return Result.ok(species);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;

        if (axiosError.response) {
          const {status, data} = axiosError.response;
          const errorMessage = typeof data === 'string' ? data : JSON.stringify(data);

          return Result.fail(new ApiError(status, `Error: ${errorMessage}`));
        }
      }

      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getAllPlanetsPopulation(): Promise<Result<number | ApiError>> {
    try {
      let response: ListResponse;
      let totalPopulation = 0;
      let nextPage;

      while (true) {
        response = (await this.axios.get('/planets/', {
          params: {
            page: nextPage
          }
        })).data as ListResponse;

        if (!response.results || response.results.length === 0) {
          return Result.fail(new ApiError(404, 'Planets not found'));
        }

        for (const planet of response.results as Planet[]) {
          if (!planet || !planet.population) {
            return Result.fail(
              new ApiError(500, 'Planet does not have the required properties'));
          }

          const population = +planet.population;

          if (population) {
            totalPopulation += population;
          }
        }

        if (!response.next) break;

        nextPage = nextPage ? nextPage + 1 : 2;
      }

      if (!totalPopulation) {
        return Result.fail(new ApiError(500, 'Total population not recorded'));
      }

      return Result.ok(totalPopulation);
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }
}
