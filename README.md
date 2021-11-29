# fx-nx-stack (WIP)

A universal + modern full-stack foundation for scalable and maintainable business apps and platforms written in TypeScript.

This WIP project stack is an opinionated set of frameworks, libraries, tools, and configurations that are intended to help meet common enterprise requirements related to scalability, maintainability, code quality, and developer productivity.

The project emphasizes the use of popular and well-regarded patterns and solutions to common web development problems. The common language (TypeScript) and use of shared libraries helps enable application of the DRY principle throughout the enterprise and across the stack.

## Project structure

This project is managed as an [nx](https://nx.dev) monorepo that contains 2x core apps:

- `apps/api` - back-end API powered by NestJS w/ TypeORM + Postgres
- `apps/ui` - front-end client UI powered by React + NextJS

The project implements shared libraries that can be imported by other apps + libraries within the project. These are housed under the `libs/` folder. This folder contains libraries organized into groups by subfolder.

- `libs/react/core` - react components that can be used across multiple apps - including [storybook](https://storybook.js.org/) configuration
- `libs/shared` - TBD (e.g. for data-related interfaces that are common to the UI + API)

Libraries can optionally be published as npm packages with additional configuration (refer to the [nx](https://nx.dev) docs).

## Project features

- tailwindcss for component styles - enables high developer productivity + enables effective re-use of components
- storybook as a component gallery and to enable implementation of a design system and live documentation

## Nx Features

### Overview

Refer to the [nx](https://nx.dev) website and documentation for a complete overview of nx's powerful features, including generators and plugins that support popular libraries and frameworks.

- generate a react app: `nx g @nrwl/react:app app-name`
  - generate a new component: `nx g @nrwl/react:component component-name --project=app-name`
- generate a new shared library: `npx nx generate @nrwl/workspace:lib --name=lib-name`
- generate a shared react component library: `nx g @nrwl/react:lib react-lib-name`
  - other apps and libraries in the project can import from the shared library from: `@fx-nx-stack/react-lib-name`

Use the `--directory` flag to generate libraries under a grouping folder. For example, to generate a library under `libs/shared/` run: `nx g @nrwl/react:lib react-lib-name --directory shared`. In configuration files such as `workspace.json`, the project name will be `shared-react-lib-name` (i.e. the grouping folder name is represented as a prefix followed by a dash).

To create an entirely new project repo / nx workspace configured to publish npm packages, run `yarn create nx-workspace --preset=npm`

Additional docs on structuring libraries can be found here: <https://nx.dev/l/a/structure/library-types>.

Run `nx dep-graph` to generate a diagram of the project's dependencies.

#### Example Commands

```sh
# generate react-core (downstream projects may import from @fx-nx-stack/react/core)
nx g @nrwl/react:lib core --directory react --style=css
```

### Package dependencies

Nx implements powerful tooling to manage project dependencies.

All dependencies are specified in the common `package.json` file found in the project root.

Each app includes its own `project.json` file that contains app-specific configurations related to Nx.

Each app's `project.json` in this repo sets `generatePackageJson` option to `true` so that an app-specific `package.json` is generated at build-time for each app that contains only that app's dependencies.

## Development server

Run `yarn start` to start both the ui client and api server in parallel.

The apps can be run separately via: `yarn start:ui` and `yarn start:ui`. It can be helpful during development to run the ui + api in seperate terminal tabs.

The local ui development server is available at: <http://localhost:4200/>.

The local api development server is available at: <http://localhost:3333/>.

In development mode, source files are watched for changes the the server(s) will reload when new changes are saved.

The front-end is configured to proxy requests to `/api` to the back-end api. This behaviour is configured in `apps/ui/proxy.conf.json`. Refer to the nx docs for more details about this particular proxy solution.

## Storybook

[Storybook](https://storybook.js.org/) provides an interactive gallery of React components. It brings a number of business and developer benefits to front-end projects.

Run `yarn storybook:lib:react-core` to run the storybook corresponding to the react-core library on <http://localhost:4400/>.

## Build

To build all apps in the project run `yarn build:all`. Run `yarn build:all:prod` for a fully production-optimized build.

The build artifacts output to the `dist/` folder.

If using NextJS static export feature to output a static front-end app, it will output to `dist/ui/exported`.

Refer to the `scripts` defined in `package.json` to understand how `nx` commands are used to initiate the build process.

## Tests

### Unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### E2E tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.
