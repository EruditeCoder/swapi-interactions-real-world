# Star Wars API

This is an Express.js API that retrieves information about the Star Wars universe using the [Star Wars API](https://swapi.dev). 

It provides endpoints to get data related to starships, species, and planets.

The app is loosely based on Domain Driven Design. It wasn't made strictly based on DDD principles for the sake of time.

## Setup
### Installation

To install the API, clone the repository and install the dependencies using npm.

```bash
git clone https://github.com/EruditeCoder/swapi-interactions-real-world.git
cd swapi-interactions-real-world
npm install
```

### Running the API

To run the API, use the ```npm start``` command.

To test it, use the ```npm test``` command.

The API will be available at http://localhost:7000/.

## Endpoints
### Get starships related to a person
```GET /starships/relations?name=${personName}```

This endpoint returns a list of starships related to a person.

Example request: ```GET /starships/relations?name=Luke Skywalker```

### Get species classification by episode
```GET /species/classification/episode/:id```

This endpoint returns a list of all species classifications for a specific episode (episode_id field in the SWAPI films response).

Example request: ```GET /species/classification/episode/1```

### Get total population of all planets
```GET /planet/total-populations```

This endpoint returns the total population of all planets in the Star Wars universe.

Note: there are planets with unknown properties; these are ignored.

Example request: ```GET /planet/total-populations```

## Conventions
The following is a list of conventions adopted in source code

- Naming conventions: Files - kabob-case, Classes/Interfaces - PascalCase, functions/variables - camelCase
- Handle asynchronous operations with async/await
- Validate, fail, and throw exceptions as early as possible
- Use const as default

## Main technologies used
- Node.js
- Express
- TypeScript
- Jest
