import { StarWarsInfoLookupRepository } from "../infrastructure/star-wars-info-lookup.repository";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";

export class AllPlanetsPopulationUseCase {
  constructor(
    private readonly starWarsInfoLookupRepository: StarWarsInfoLookupRepository
  ) {}

  async execute(): Promise<Result<number | ApiError>> {
    try {
      const totalPopulationOrError = await this.starWarsInfoLookupRepository.getAllPlanetsPopulation();

      if (totalPopulationOrError.isFailure) {
        return Result.fail(new ApiError(
          totalPopulationOrError.errorValue().code, totalPopulationOrError.errorValue().message));
      }

      const totalPopulation = totalPopulationOrError.getValue();

      return Result.ok(totalPopulation);
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }
}
