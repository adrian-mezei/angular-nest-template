# Backend <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" height="28" alt="Nest Logo" /></a>

## Description

This project is a template for any application that uses [Nest](https://github.com/nestjs/nest) as a backend Node.js framework. This project was generated with [Nest CLI](https://docs.nestjs.com/cli/overview) version 7.5.3.

## Dependency installation

```bash
# install dependencies
$ npm install
```

## Configuration

The application uses `dotenv-defaults` for environment variable loading and a local config YAML file for default values. The configurations are loaded from `src/config.yml` file, `.env.defaults` file, `.env` file, `environment variables` in this order. Tha later override the earlier in case the same key exist in multiple locations. The config YAML file can be hierarhic while environment variables are flattened and double underscores ("\_\_") are the separators.

## Running the app

```bash
# development with debugging and file watching
$ npm run start

# production mode
$ npm run start:prod
```

The application is configured to start in debugging mode and watch file changes and recompile changes automatically.

## Code scaffolding

```bash
# generate a new module
$ npm run m -- ice-cream

# generate a new controller
$ npm run c -- ice-cream

# generate a new service
$ npm run s -- ice-cream
```

## Build

```bash
# build the project
$ npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Lint

```bash
# run the linter
$ npm run lint
```

The linting is executed via [ESLint](https://eslint.org/).

## Format

```bash
# run the formatter
$ npm run format
```

Formatting is executed via [Prettier](https://prettier.io/).

## Tests

```bash
# run unit tests
$ npm run test

# run unit tests and watch file changes
$ npm run test:watch

# run end-to-end tests
$ npm run test:e2e

# run all tests, liter and formatter
$ npm run test:all
```

Unit and end-to-end tests are executed via [Jest](https://jestjs.io/).
