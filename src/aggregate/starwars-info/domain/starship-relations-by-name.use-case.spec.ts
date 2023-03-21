import { AllPlanetsPopulationUseCase } from "./all-planets-population.use-case";
import { StarWarsInfoLookupDataSourceRepository } from "../infrastructure/star-wars-info-lookup.data-source.repository";
import { Result } from "../../../utils/shared/result";
import { StarshipRelationsByNameUseCase } from "./starship-relations-by-name.use-case";

const starshipRelationsByNameUseCase = new StarshipRelationsByNameUseCase(new StarWarsInfoLookupDataSourceRepository());

const spyGetPersonDetailsByName = jest.spyOn(StarWarsInfoLookupDataSourceRepository.prototype, 'getPersonDetailsByName');
const spyGetStarshipDetailsById = jest.spyOn(StarWarsInfoLookupDataSourceRepository.prototype, 'getStarshipDetailsById');

describe(`${AllPlanetsPopulationUseCase.name}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`${AllPlanetsPopulationUseCase.prototype.execute.name}`, () => {
    describe('when everything works as expected', () => {
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

      it('should return the total population', async () => {
        const result = await starshipRelationsByNameUseCase.execute('success');

        expect(result.isSuccess).toBeTruthy();
      });
    });
  });
});
