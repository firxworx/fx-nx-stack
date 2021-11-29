# fx-nx-stack (WIP)

A universal + modern full-stack foundation for scalable and maintainable business apps and platforms written in TypeScript.

This WIP project stack is an opinionated set of frameworks, libraries, and configurations. The project emphasizes popular and well-regarded solutions to common web development problems, and enables observation of the DRY principle across the entire project.

This project is managed as an [nx](https://nx.dev) monorepo that contains 2x core apps:

- `apps/api` - back-end API powered by NestJS w/ TypeORM + Postgres
- `apps/ui` - front-end client UI powered by React + NextJS

The goal is to build up an integrated TypeScript project stack that contains patterns and solutions common to a wide variety of business applications.

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

All dependencies are specified in a single `package.json` file found in the project root. Each app includes a `project.json` file containing app-specific configuration.

Each app's `project.json` in this repo sets `generatePackageJson` option to `true` so that an app-specific `package.json` is generated at build-time for each app that contains only that app's dependencies.

## Development server

Run `yarn start` to start both the ui client and api server in parallel.

The apps can be run separately via: `yarn start:ui` and `yarn start:ui`. It can be helpful during development to run the ui + api in seperate terminal tabs.

The local ui development server is available at: <http://localhost:4200/>.

The local api development server is available at: <http://localhost:3333/>.

In development mode, source files are watched for changes the the server(s) will reload when new changes are saved.

The front-end is configured to proxy requests to `/api` to the back-end api. This behaviour is configured in `apps/ui/proxy.conf.json`. Refer to the nx docs for more details about this particular proxy solution.

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
