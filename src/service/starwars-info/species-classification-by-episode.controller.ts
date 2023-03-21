import {
  SpeciesClassificationByEpisodeUseCase
} from "../../aggregate/starwars-info/domain/species-classification-by-episode.use-case";
import {
  StarWarsInfoLookupDataSourceRepository
} from "../../aggregate/starwars-info/infrastructure/star-wars-info-lookup.data-source.repository";
import { ApiError } from "../../utils/shared/api-error";

export class SpeciesClassificationByEpisodeController {
  private readonly speciesClassificationByEpisode: SpeciesClassificationByEpisodeUseCase;

  constructor() {
    const lookupRepository = new StarWarsInfoLookupDataSourceRepository();

    this.speciesClassificationByEpisode = new SpeciesClassificationByEpisodeUseCase(lookupRepository)
  }

  validate(name: string) {
    return !!name;
  }

  async process(episode: string): Promise<ApiError | { name: string, classification: string }[]> {
    const classifications = await this.speciesClassificationByEpisode.execute(episode);

    return classifications.isSuccess ? classifications.getValue() : classifications.errorValue();
  }
}
