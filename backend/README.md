# Backend <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" height="28" alt="Nest Logo" /></a>

## Description

This project is a template for any application that uses [Nest](https://github.com/nestjs/nest) as a backend Node.js framework. This project was generated with [Nest CLI](https://docs.nestjs.com/cli/overview) version 7.5.3.

## Dependency installation

```bash
# install dependencies
$ npm install
```

## Configuration

The application uses `dotenv` for environment variable loading and a local YAML file for default configuration values. The configurations are loaded from `src/config.yml` file, `.env` file, `environment variables` in this order. The later override the earlier in case the same key exist in multiple locations. The config YAML file can be hierarchic while environment variables are flattened and double underscores ("\_\_") are the separators. A sample file for `.env` is provided as `.env-sample.env` that contains the keys that must be configured in the `.env` file.

## Running the app

```bash
# development with debugging and file watching
$ npm run start

# production mode
$ npm run start:prod
```

The application is configured to start in debugging mode and watch file changes and recompile changes automatically.

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

## Spell check

```bash
# run the spell checker
$ npm run cspell
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

## Logging

The application uses `winston` to handle logging. Configurations can be edited in the config YAML file and through environment variables. Logs can be written to the console or to files, they can be colorized and formatted, and log levels can also be set.

## Development

### Code scaffolding

```bash
# generate a new module
$ npm run m -- ice-cream

# generate a new controller
$ npm run c -- ice-cream

# generate a new service
$ npm run s -- ice-cream
```

### Recommended VSCode plugins

-   [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) for `.env` file syntax highlight.
-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for consistent code formatting.
-   [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) for tslint rule validation.
-   [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) for TODO highlight and collection.
-   [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
