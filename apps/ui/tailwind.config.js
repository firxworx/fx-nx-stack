const { join } = require('path')

const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind')

module.exports = {
  presets: [require('../../tailwind-preset.js')],
  mode: 'jit',
  purge: [
    // scan files for tailwind classes - note `__dirname` because cwd is repo root (i.e. where yarn script commands run from)
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),

    // if you use a React+tailwind component library from a remote package and want to add its classes to this purge config:
    // join(__dirname, '..', '..', 'node_modules/@organization/package-name/**/*.js'),

    // leverage nx to dynamically calculate glob pattern that covers components imported from other libs/apps in the project:
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
