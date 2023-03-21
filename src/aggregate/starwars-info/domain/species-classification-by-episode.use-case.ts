import { StarWarsInfoLookupRepository } from "../infrastructure/star-wars-info-lookup.repository";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";
import { Film } from "../data/film.interface";

export class SpeciesClassificationByEpisodeUseCase {
  constructor(
    private readonly starWarsInfoLookupRepository: StarWarsInfoLookupRepository
  ) {}

  async execute(episode: string): Promise<Result<{name: string, classification: string}[] | ApiError>> {
    try {
      const film = await this.starWarsInfoLookupRepository.getFilmByEpisode(episode);

      if (film.isFailure) {
        return Result.fail(new ApiError(404, 'Film not found for episode ' + episode));
      }

      const speciesURLs = (film.getValue() as Film).species;

      if (!speciesURLs || speciesURLs.length === 0) {
        return Result.fail(new ApiError(404, 'Species not found for episode ' + episode))
      }

      const speciesClassificationPromises = speciesURLs.map(url => {
        const id = url?.match(/(\d+)\/?$/)?.[1];

        if (id) return this.starWarsInfoLookupRepository.getSpeciesClassificationById(id);
      });

      const speciesClassificationResponses = (await Promise.all(speciesClassificationPromises));

      const hasFailedClassification = speciesClassificationResponses.find(resp => (resp && resp.isFailure) || !resp);

      if (hasFailedClassification) {
        return Result.fail(new ApiError(500, `Failed to retrieve species classification: ${(hasFailedClassification.error?.code)}`));
      } else if (!speciesClassificationResponses || speciesClassificationResponses.length === 0 || speciesClassificationResponses.some(e => !e)) {
        return Result.fail(new ApiError(404, `No species classification found`));
      }

      const speciesClassifications = speciesClassificationResponses.map(res => {
        if (res) {
          return res.getValue();
        }
      }) as { name: string, classification: string }[];

      return Result.ok(speciesClassifications);
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }
}
