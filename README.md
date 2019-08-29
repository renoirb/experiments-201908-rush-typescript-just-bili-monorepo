# Experimenting with [Rush.js](https://rushjs.io/pages/maintainer/setup_new_repo/)

## Expected outcome

Each package should have the minimum boilerplate for:

- least number of packaging manifest (i.e. only a `bili.config.js`, or `just.config.js`)
- smallest `package.json` contents as possible
- package publish step common for all packages
- tests at the same place (e.g. in `src/__tests__/`), regardless if it's written in JavaScript, ECMAScript 6+, TypeScript.

## Objective

- Streamline how we publish things so we can import them consistently in many runtime environments (no copy pasta, just import in package.json, require/import in code, use)
- Harmonize way of packaging, maintenance, with less boilerplate
- So other team members will quickly see what's really needed to create new modules

## Desired features

- Easy to spot or get feedback when missing dependency between packages
- Can depend between packages

