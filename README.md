# fx-nx-stack (WIP)

A universal + modern foundation for creating business apps and platforms in TypeScript.

A WIP project stack that aims to be an opinionated boilerplate/starter for end-to-end TypeScript development with an emphasis on maintainability and observation of the DRY principle across the entire stack and projects.

This project is managed as an [nx](https://nx.dev) monorepo that contains 2x core apps:

- `apps/api` - back-end API powered by NestJS
- `apps/ui` - front-end client UI powered by React + NextJS

Postgres is the preferred persistence/data store.

The goal is fully integrated TypeScript project stack that includes solutions for auth +

## Nx Features

Refer to the [nx](https://nx.dev) website and documentation for a complete overview of nx's powerful features, including generators and plugins that support popular libraries and frameworks.

- generate a react app: `nx g @nrwl/react:app app-name`
  - generate a new component: `nx g @nrwl/react:component component-name --project=app-name`
- generate a shared library: `nx g @nrwl/react:lib lib-name`
  - other apps and libraries in the project can import from the shared library from: `@fx-nx-stack/lib-name`

Run `nx dep-graph` to generate a diagram of the project's dependencies.

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
