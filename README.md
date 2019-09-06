# Experimenting with [a _monorepo_ using **Rush.js**][rush-maintainer-setup-repo]

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

## Trying it out

All examples below expects you first have `@microsoft/rush` installed globally, [refer to the docs][rush-maintainer-setup-repo].

For Continuous integration mode, refer to [.gitlab-ci.yml](./.gitlab-ci.yml).

### Run with debugging

```bash
export CI_SERVER="yes-capn" # Assuming GitLab or other CI would have such variable set in CI mode.
export DEBUG="*,-babel,-agentkeepalive,-fetch-retry"
rush update
rush build
```

[rush-maintainer-setup-repo]: https://rushjs.io/pages/maintainer/setup_new_repo/ 'Setup new Rush.js repo'
