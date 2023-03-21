import { StarWarsInfoLookupRepository } from "../infrastructure/star-wars-info-lookup.repository";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";
import { Person } from "../data/person.interface";
import { SingleStarshipResponse } from "../data/starship.interface";

export class StarshipRelationsByNameUseCase {
  constructor(
    private readonly starWarsInfoLookupRepository: StarWarsInfoLookupRepository
  ) {}

  async execute(name: string): Promise<Result<{ name: string; relatedStarships: SingleStarshipResponse[] } | ApiError>> {
    try {
      const personResponse = await this.starWarsInfoLookupRepository.getPersonDetailsByName(name);

      if (personResponse.isFailure) {
        return Result.fail(new ApiError(404, 'Person not found - ' + name));
      }

      const person = personResponse.getValue() as Person;

      const starshipPromises = person.starships.map(
        url => {
          const id = url?.match(/(\d+)\/?$/)?.[1];

          if (id) return this.starWarsInfoLookupRepository.getStarshipDetailsById(id);
        }
      );

      const starshipResponses = (await Promise.all(starshipPromises));

      const hasFailedStarship = starshipResponses.find(resp => {
        return (resp && resp.isFailure) || !resp;
      });

      if (hasFailedStarship) {
        return Result.fail(new ApiError(500, `Failed to retrieve starship details: ${(hasFailedStarship.error?.code)}`));
      } else if (!starshipResponses || starshipResponses.length === 0 || starshipResponses.some(e => !e)) {
        return Result.fail(new ApiError(404, `No starships found for ` + name));
      }

      const starships = starshipResponses.map(res => {
        if (res) {
          return res.getValue();
        }
      }) as unknown as SingleStarshipResponse[];

      return Result.ok({
        name: person.name,
        relatedStarships: starships
      });
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }
}
