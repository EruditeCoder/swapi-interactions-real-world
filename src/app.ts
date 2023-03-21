import express from 'express';
import {
  StarshipRelationsController
} from "./service/starwars-info/starship-relations.controller";
import { ApiError } from "./utils/shared/api-error";
import {
  SpeciesClassificationByEpisodeController
} from "./service/starwars-info/species-classification-by-episode.controller";
import { AllPlanetsPopulationController } from "./service/starwars-info/all-planets-population.controller";

const app = express();

app.use(express.json());

// returns a list of the starships related to a person
app.get('/starships/relations', async (req: any, res: any) => {
  const name = req.query.name;

  const controller = new StarshipRelationsController();

  const isValid = controller.validate(name);

  if (!isValid) {
    return res.status(400).send(new ApiError(400, 'Bad request, check query parameters'));
  }

  const starships = await controller.process(name);

  return res.status('code' in starships && 'message' in starships ? starships.code : 200).send(starships);
})

// returns the classification of all species in a certain episode
app.get('/species/classification/episode/:id', async (req: any, res: any) => {
  const episode = req.params.id;

  const controller = new SpeciesClassificationByEpisodeController();

  const isValid = controller.validate(episode);

  if (!isValid) {
    return res.status(400).send(new ApiError(400, 'Bad request, check query parameters'));
  }

  const classifications = await controller.process(episode);

  return res.status('code' in classifications && 'message' in classifications ? classifications.code : 200).send(classifications);
})

// returns the total population of all planets
app.get('/planet/total-populations', async (req: any, res: any) => {
  const controller = new AllPlanetsPopulationController();

  const classifications = await controller.process();

  return res.status('code' in classifications && 'message' in classifications ? classifications.code : 200).send(classifications);
})

app.listen('7000', () => {
  console.log('Server running at port 7000');
})
