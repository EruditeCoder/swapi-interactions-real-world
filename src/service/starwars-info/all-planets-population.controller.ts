import {
  StarWarsInfoLookupDataSourceRepository
} from "../../aggregate/starwars-info/infrastructure/star-wars-info-lookup.data-source.repository";
import { ApiError } from "../../utils/shared/api-error";
import { AllPlanetsPopulationUseCase } from "../../aggregate/starwars-info/domain/all-planets-population.use-case";

export class AllPlanetsPopulationController {
  private readonly allPlanetsPopulationUseCase: AllPlanetsPopulationUseCase;

  constructor() {
    const lookupRepository = new StarWarsInfoLookupDataSourceRepository();

    this.allPlanetsPopulationUseCase = new AllPlanetsPopulationUseCase(lookupRepository);
  }

  async process(): Promise<ApiError | { totalPopulation: number }> {
    const population = await this.allPlanetsPopulationUseCase.execute();

    if (population.isFailure) {
      return population.errorValue()
    } else {
      return {
        totalPopulation: population.getValue() as number
      }
    }
  }
}
