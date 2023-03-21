import { StarWarsInfoLookupDataSourceRepository } from "../infrastructure/star-wars-info-lookup.data-source.repository";
import { Result } from "../../../utils/shared/result";
import { SpeciesClassificationByEpisodeUseCase } from "./species-classification-by-episode.use-case";

const speciesClassificationByEpisodeUseCase = new SpeciesClassificationByEpisodeUseCase(new StarWarsInfoLookupDataSourceRepository());

const spyGetFilmByEpisode = jest.spyOn(StarWarsInfoLookupDataSourceRepository.prototype, 'getFilmByEpisode');
const spyGetSpeciesClassificationById = jest.spyOn(StarWarsInfoLookupDataSourceRepository.prototype, 'getSpeciesClassificationById');

describe(`${SpeciesClassificationByEpisodeUseCase.name}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`${SpeciesClassificationByEpisodeUseCase.prototype.execute.name}`, () => {
    describe('when everything works as expected', () => {
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
        ],
        created: new Date(),
        edited: new Date(),
        url: "https://swapi.dev/api/films/1/"
      }));
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

      it('should return the species classification', async () => {
        const result = await speciesClassificationByEpisodeUseCase.execute('success');

        expect(result.isSuccess).toBeTruthy();
      });
    });
  });
});
