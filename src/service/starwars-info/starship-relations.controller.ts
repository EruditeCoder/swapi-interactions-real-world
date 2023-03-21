import {
  StarWarsInfoLookupDataSourceRepository
} from "../../aggregate/starwars-info/infrastructure/star-wars-info-lookup.data-source.repository";
import { ApiError } from "../../utils/shared/api-error";
import { SingleStarshipResponse } from "../../aggregate/starwars-info/data/starship.interface";
import {
  StarshipRelationsByNameUseCase
} from "../../aggregate/starwars-info/domain/starship-relations-by-name.use-case";

export class StarshipRelationsController {
  private readonly retrieveStarshipRelationsByNameUseCase: StarshipRelationsByNameUseCase;

  constructor() {
    const lookupRepository = new StarWarsInfoLookupDataSourceRepository();

    this.retrieveStarshipRelationsByNameUseCase = new StarshipRelationsByNameUseCase(lookupRepository);
  }

  validate(name: string) {
    return !!name;
  }

  async process(name: string): Promise<ApiError | { name: string; relatedStarships: SingleStarshipResponse[] }> {
    const starships = await this.retrieveStarshipRelationsByNameUseCase.execute(name);

    return starships.isSuccess ? starships.getValue() : starships.errorValue();
  }
}
