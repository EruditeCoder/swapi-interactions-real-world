import { StarWarsInfoLookupDataSourceRepository } from "./star-wars-info-lookup.data-source.repository";
import { StarWarsClient } from "../../../utils/starwars.client";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";

const repository = new StarWarsInfoLookupDataSourceRepository();

const spyGetPersonDetailsByName = jest.spyOn(StarWarsClient.prototype, 'getPersonDetailsByName');
const spyGetStarshipDetailsById = jest.spyOn(StarWarsClient.prototype, 'getStarshipDetailsById');
const spyGetFilmByEpisode = jest.spyOn(StarWarsClient.prototype, 'getFilmByEpisode');
const spyGetSpeciesClassificationById = jest.spyOn(StarWarsClient.prototype, 'getSpeciesById');
const spyGetAllPlanetsPopulation = jest.spyOn(StarWarsClient.prototype, 'getAllPlanetsPopulation');

describe(`${StarWarsInfoLookupDataSourceRepository.name}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`${StarWarsInfoLookupDataSourceRepository.prototype.getPersonDetailsByName.name}`, () => {
    describe('when a person is found', () => {
      spyGetPersonDetailsByName.mockResolvedValueOnce(Result.ok({
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [
          "https://swapi.dev/api/films/2/",
          "https://swapi.dev/api/films/6/",
          "https://swapi.dev/api/films/3/",
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/7/"
        ],
        species: [
          "https://swapi.dev/api/species/1/"
        ],
        vehicles: [
          "https://swapi.dev/api/vehicles/14/",
          "https://swapi.dev/api/vehicles/30/"
        ],
        starships: [
          "https://swapi.dev/api/starships/12/",
          "https://swapi.dev/api/starships/22/"
        ],
        created: new Date(),
        edited: new Date(),
        url: "https://swapi.dev/api/people/1/"
      }));

      it('should return person details', async () => {
        const result = await repository.getPersonDetailsByName('success');

        expect(result.isSuccess).toBeTruthy();
      });
    });

    describe('when a person is not found', () => {
      spyGetPersonDetailsByName.mockResolvedValueOnce(Result.fail(
        new ApiError(404, 'Person not found')));

      it('should return a 404 failure response', async () => {
        const result = await repository.getPersonDetailsByName('failure');

        expect(result.errorValue().code).toEqual(404);
      });
    });

    describe('when there is an unexpected failure', () => {
      spyGetPersonDetailsByName.mockRejectedValueOnce(Result.fail(
        new ApiError(500, 'Error')));

      it('should return a 500 failure response', async () => {
        const result = await repository.getPersonDetailsByName('failure');

        expect(result.errorValue().code).toEqual(500);
      });
    });
  });

  describe(`${StarWarsInfoLookupDataSourceRepository.prototype.getStarshipDetailsById.name}`, () => {
    describe('when a starship is found', () => {
      spyGetStarshipDetailsById.mockResolvedValueOnce(Result.ok({
        starshipName: "X-wing",
        info: {
          name: "X-wing",
          model: "T-65 X-wing",
          manufacturer: "Incom Corporation",
          cost_in_credits: "149999",
          length: "12.5",
          max_atmosphering_speed: "1050",
          crew: "1",
          passengers: "0",
          cargo_capacity: "110",
          consumables: "1 week",
          hyperdrive_rating: "1.0",
          MGLT: "100",
          starship_class: "Starfighter",
          pilots: [
            "https://swapi.dev/api/people/1/",
            "https://swapi.dev/api/people/9/",
            "https://swapi.dev/api/people/18/",
            "https://swapi.dev/api/people/19/"
          ],
          films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/"
          ],
          created: new Date(),
          edited: new Date(),
          url: "https://swapi.dev/api/starships/12/"
        }
      }));

      it('should return starship details', async () => {
        const result = await repository.getStarshipDetailsById('success');

        expect(result.isSuccess).toBeTruthy();
      });
    });

    describe('when a starship is not found', () => {
      spyGetStarshipDetailsById.mockResolvedValueOnce(Result.fail(
        new ApiError(404, 'Starship not found')));

      it('should return a 404 failure response', async () => {
        const result = await repository.getStarshipDetailsById('failure');

        expect(result.errorValue().code).toEqual(404);
      });
    });

    describe('when there is an unexpected failure', () => {
      spyGetStarshipDetailsById.mockRejectedValueOnce(Result.fail(
        new ApiError(500, 'Error')));

      it('should return a 500 failure response', async () => {
        const result = await repository.getStarshipDetailsById('failure');

        expect(result.errorValue().code).toEqual(500);
      });
    });
  });

  describe(`${StarWarsInfoLookupDataSourceRepository.prototype.getFilmByEpisode.name}`, () => {
    describe('when a film is found', () => {
      spyGetFilmByEpisode.mockResolvedValueOnce(Result.ok({
        title: "A New Hope",
        episode_id: "4",
        opening_crawl: "It is a period of civil war.\r\nRebel spaceships, " +
          "striking\r\nfrom a hidden base, have won\r\ntheir first victory " +
          "against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies " +
          "managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, " +
          "an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\n" +
          "Pursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\n" +
          "starship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\n" +
          "freedom to the galaxy....",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: new Date(),
        characters: [
          "https://swapi.dev/api/people/1/",
          "https://swapi.dev/api/people/2/",
          "https://swapi.dev/api/people/3/",
          "https://swapi.dev/api/people/4/",
          "https://swapi.dev/api/people/5/",
          "https://swapi.dev/api/people/6/",
          "https://swapi.dev/api/people/7/",
          "https://swapi.dev/api/people/8/",
          "https://swapi.dev/api/people/9/",
          "https://swapi.dev/api/people/10/",
          "https://swapi.dev/api/people/12/",
          "https://swapi.dev/api/people/13/",
          "https://swapi.dev/api/people/14/",
          "https://swapi.dev/api/people/15/",
          "https://swapi.dev/api/people/16/",
          "https://swapi.dev/api/people/18/",
          "https://swapi.dev/api/people/19/",
          "https://swapi.dev/api/people/81/"
        ],
        planets: [
          "https://swapi.dev/api/planets/1/",
          "https://swapi.dev/api/planets/2/",
          "https://swapi.dev/api/planets/3/"
        ],
        starships: [
          "https://swapi.dev/api/starships/2/",
          "https://swapi.dev/api/starships/3/",
          "https://swapi.dev/api/starships/5/",
          "https://swapi.dev/api/starships/9/",
          "https://swapi.dev/api/starships/10/",
          "https://swapi.dev/api/starships/11/",
          "https://swapi.dev/api/starships/12/",
          "https://swapi.dev/api/starships/13/"
        ],
        vehicles: [
          "https://swapi.dev/api/vehicles/4/",
          "https://swapi.dev/api/vehicles/6/",
          "https://swapi.dev/api/vehicles/7/",
          "https://swapi.dev/api/vehicles/8/"
        ],
        species: [
          "https://swapi.dev/api/species/1/",
          "https://swapi.dev/api/species/2/",
          "https://swapi.dev/api/species/3/",
          "https://swapi.dev/api/species/4/",
          "https://swapi.dev/api/species/5/"
        ],
        created: new Date(),
        edited: new Date(),
        url: "https://swapi.dev/api/films/1/"
      }));

      it('should return film details', async () => {
        const result = await repository.getFilmByEpisode('success');

        expect(result.isSuccess).toBeTruthy();
      });
    });

    describe('when a film is not found', () => {
      spyGetFilmByEpisode.mockResolvedValueOnce(Result.fail(
        new ApiError(404, 'Film not found')));

      it('should return a 404 failure response', async () => {
        const result = await repository.getFilmByEpisode('failure');

        expect(result.errorValue().code).toEqual(404);
      });
    });

    describe('when there is an unexpected failure', () => {
      spyGetFilmByEpisode.mockRejectedValueOnce(Result.fail(
        new ApiError(500, 'Error')));

      it('should return a 500 failure response', async () => {
        const result = await repository.getFilmByEpisode('failure');

        expect(result.errorValue().code).toEqual(500);
      });
    });
  });

  describe(`${StarWarsInfoLookupDataSourceRepository.prototype.getSpeciesClassificationById.name}`, () => {
    describe('when a species is found', () => {
      spyGetSpeciesClassificationById.mockResolvedValueOnce(Result.ok({
        name: "Human",
        classification: "mammal",
        designation: "sentient",
        average_height: "180",
        skin_colors: "caucasian, black, asian, hispanic",
        hair_colors: "blonde, brown, black, red",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        average_lifespan: "120",
        homeworld: "https://swapi.dev/api/planets/9/",
        language: "Galactic Basic",
        people: [
          "https://swapi.dev/api/people/66/",
          "https://swapi.dev/api/people/67/",
          "https://swapi.dev/api/people/68/",
          "https://swapi.dev/api/people/74/"
        ],
        films: [
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/2/",
          "https://swapi.dev/api/films/3/",
          "https://swapi.dev/api/films/4/",
          "https://swapi.dev/api/films/5/",
          "https://swapi.dev/api/films/6/"
        ],
        created: new Date(),
        edited: new Date(),
        url: "https://swapi.dev/api/species/1/"
      }));

      it('should return species classification', async () => {
        const result = await repository.getSpeciesClassificationById('success');

        expect(result.isSuccess).toBeTruthy();
      });
    });

    describe('when a film is not found', () => {
      spyGetSpeciesClassificationById.mockResolvedValueOnce(Result.fail(
        new ApiError(404, 'Film not found')));

      it('should return a 404 failure response', async () => {
        const result = await repository.getSpeciesClassificationById('failure');

        expect(result.errorValue().code).toEqual(404);
      });
    });

    describe('when there is an unexpected failure', () => {
      spyGetSpeciesClassificationById.mockRejectedValueOnce(Result.fail(
        new ApiError(500, 'Error')));

      it('should return a 500 failure response', async () => {
        const result = await repository.getSpeciesClassificationById('failure');

        expect(result.errorValue().code).toEqual(500);
      });
    });
  });

  describe(`${StarWarsInfoLookupDataSourceRepository.prototype.getAllPlanetsPopulation.name}`, () => {
    describe('when the population could be calculated', () => {
      spyGetAllPlanetsPopulation.mockResolvedValueOnce(Result.ok(37366402));

      it('should return planet population', async () => {
        const result = await repository.getAllPlanetsPopulation();

        expect(result.isSuccess).toBeTruthy();
      });
    });

    describe('when the population could not be calculated because planets were not found', () => {
      spyGetAllPlanetsPopulation.mockResolvedValueOnce(Result.fail(
        new ApiError(404, 'Planets not found')));

      it('should return a 404 failure response', async () => {
        const result = await repository.getAllPlanetsPopulation();

        expect(result.errorValue().code).toEqual(404);
      });
    });

    describe('when there is an unexpected failure', () => {
      spyGetAllPlanetsPopulation.mockRejectedValueOnce(Result.fail(
        new ApiError(500, 'Error')));

      it('should return a 500 failure response', async () => {
        const result = await repository.getAllPlanetsPopulation();

        expect(result.errorValue().code).toEqual(500);
      });
    });
  });
});
