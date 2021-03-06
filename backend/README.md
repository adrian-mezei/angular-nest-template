# Backend <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" height="28" alt="Nest Logo" /></a>

This project is a template for any application that uses [Nest](https://github.com/nestjs/nest) as a backend Node.js framework. This project was generated with [Nest CLI](https://docs.nestjs.com/cli/overview).

## Dependency installation

```bash
# install dependencies
$ npm install
```

## Configuration

The application uses `dotenv` for environment variable loading and a local JSON file for default configuration values. The configurations are loaded from `src/configs/config.json` file, `.env` file, `environment variables` in this order. The latter overrides the earlier in case the same key exists in multiple locations. The config JSON file can be hierarchic while environment variables are flattened and double underscores ("\_\_") are the separators. A sample file for `.env` is provided as `.env-sample.env` that contains the keys that must be configured in the `.env` file.

## Running the app

The application is configured to start in debugging mode and watch file changes and recompile changes automatically.

```bash
# development with debugging and file watching
$ npm run start

# production mode
$ npm run start:prod
```

## Build

The build artifacts will be stored in the `dist/` directory.

```bash
# build the project
$ npm run build
```

## Lint

The linting is executed via [ESLint](https://eslint.org/).

```bash
# run the linter
$ npm run lint
```

## Format

Formatting is executed via [Prettier](https://prettier.io/).

```bash
# run the formatter
$ npm run format
```

## Spell check

Code spell checking is performed by [cspell](https://github.com/streetsidesoftware/cspell#readme).

```bash
# run the spell checker
$ npm run spell
```

## Tests

Unit and end-to-end tests are executed via [Jest](https://jestjs.io/).

```bash
# run unit tests
$ npm run test

# run unit tests and watch file changes
$ npm run test:watch

# run unit tests and watch file changes for a single file
$ npm run test:watch -- ice-cream.controller.spec.ts

# run end-to-end tests
$ npm run test:e2e

# run all tests, linter, and formatter
$ npm run test:all
```

## Logging

The application uses [winston](https://github.com/winstonjs/winston) to handle logging. Configurations can be edited in the config JSON file and through environment variables. Logs can be written to the console or into files, they can be colorized and formatted, and log levels can also be set.

## Development

### Code scaffolding

```bash
# generate a new module named "ice-cream"
$ npm run m -- modules/ice-cream

# generate a new controller named "ice-cream" under the module named "ice-cream"
$ npm run c -- modules/ice-cream/controller/ice-cream

# generate a new service named "ice-cream" under the module named "ice-cream"
$ npm run s -- modules/ice-cream/service/ice-cream
```

### Database migrations

The application uses [TypeORM](https://typeorm.io/) for
object–relational mapping. It can also be used for migration generation and execution. There are a few preconstructed npm scripts for these:

```bash
# use typeorm
$ npm run typeorm

# create an empty migration template
$ npm run migration:create -- IceCreamEntitiesAdded

# auto-generate a migration for the differences between the  database and code
$ npm run migration:generate -- IceCreamEntitiesAdded

# execute pending migrations
$ npm run migration:run

# revert a migration
$ npm run migration:revert
```

TypeORM provides an easy way to configure database synchronization. (This configuration indicates that the database schema should be auto created at every application launch.) Do not use this is production, otherwise you can lose production data. This can be turned on in the TypeORM configuration section of the [src/configs/app.config.ts](src/configs/app.config.ts) by setting the `synchronize` attribute to `true`.

### Recommended VSCode plugins

-   [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) for `.env` file syntax highlight.
-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for consistent code formatting.
-   [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) for tslint rule validation.
-   [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) for TODO highlight and collection.
-   [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) for code spell checking
