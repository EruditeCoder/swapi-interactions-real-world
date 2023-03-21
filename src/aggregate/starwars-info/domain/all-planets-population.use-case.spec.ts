import { AllPlanetsPopulationUseCase } from "./all-planets-population.use-case";
import { StarWarsInfoLookupDataSourceRepository } from "../infrastructure/star-wars-info-lookup.data-source.repository";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";

const allPlanetsPopulationUseCase = new AllPlanetsPopulationUseCase(new StarWarsInfoLookupDataSourceRepository());

const spyGetAllPlanetsPopulation = jest.spyOn(StarWarsInfoLookupDataSourceRepository.prototype, 'getAllPlanetsPopulation');

describe(`${AllPlanetsPopulationUseCase.name}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`${AllPlanetsPopulationUseCase.prototype.execute.name}`, () => {
    describe('when everything works as expected', () => {
      spyGetAllPlanetsPopulation.mockResolvedValueOnce(Result.ok(396524));

      it('should return the total population', async () => {
        const result = await allPlanetsPopulationUseCase.execute();

        expect(result.isSuccess).toBeTruthy();
      });
    });

    describe('when the total population could not be calculated', () => {
      spyGetAllPlanetsPopulation.mockResolvedValueOnce(Result.fail(
        new ApiError(404, 'Planets not found')));

      it('should return a 404 error', async () => {
        const result = await allPlanetsPopulationUseCase.execute();

        expect(result.errorValue().code).toEqual(404);
      });
    });
  });
});
