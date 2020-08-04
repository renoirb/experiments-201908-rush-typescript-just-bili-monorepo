# [@renoirb/tools-bundling-helpers][url-repo] [![npm][shields-npm]][url-npmjs]

Bundling helpers such as CLI utilities and packaging branding utilities

| Size                                | Dependencies                                                             |
| ----------------------------------- | ------------------------------------------------------------------------ |
| ![Bundle size][shields-bundle-size] | ![Libraries.io dependency status for latest release][shields-dependabot] |

[url-npmjs]: https://www.npmjs.com/package/%40renoirb%2Ftools-bundling-helpers
[url-repo]: https://github.com/renoirb/experiments-201908-rush-typescript-just-bili-monorepo/tree/v1.x-dev/tools/bundling-helpers
[shields-npm]: https://img.shields.io/npm/v/%40renoirb%2Ftools-bundling-helpers?style=flat-square&logo=appveyor&label=npm&logo=npm
[shields-bundle-size]: https://img.shields.io/bundlephobia/min/%40renoirb%2Ftools-bundling-helpers?style=flat-square
[shields-dependabot]: https://img.shields.io/librariesio/release/npm/%40renoirb%2Ftools-bundling-helpers?style=flat-square&logo=appveyor&logo=dependabot


## Usage

### CommandLineUtilities

Utility we can use in a package's bin script.

```bash
#!/usr/bin/env node
'use strict';

const { CommandLineUtilities } = require('@renoirb/tools-bundling-helpers');

# Example of a way to handle logic by existence of a shell environment variable
const isCI = CommandLineUtilities.hasEnvFlag('CI_SERVER');
if (isCI) {
  process.argv.push('--quiet');
} else {
  process.argv.push('--verbose');
}
```

### createBannerInfo

An utility to help manage a package's top of the file "banner"

```js
// const pkg = require('../package.json')
// Imagine package.json had the lines like below
const pkg = {
  name: 'assimilate',
  version: '436.0.1',
  author: {
    email: '7.9@adjunct.3.unimatrix.1.borg',
    name: 'Seven Of Nine',
  },
}
const branding = {
  firstYear: 1484,
  vendor: 'Borg Collective',
}
const bannerInfo = createBannerInfo(pkg, branding)
console.log(bannerInfo)
```

Would return

```json
{
  "author": "Seven Of Nine <7.9@adjunct.3.unimatrix.1.borg>",
  "copyright": "Copyright (c) 1484-2020 Borg Collective",
  "license": "LicenseRef-LICENSE",
  "name": "assimilate",
  "vendor": "Borg Collective",
  "version": "436.0.1"
}
```

We can pass this to `createBannerFooter` and get a banner and footer string for bundling tools such as Rollup.

```js
// From example above
const bannerInfo = createBannerInfo(pkg, branding)
const bannerFooter = createBannerFooter(bannerInfo)
console.log(bannerFooter.banner)
```

Would return

```
/**
 * assimilate v436.0.1
 *
 * Maintainer: Seven Of Nine <7.9@adjunct.3.unimatrix.1.borg>
 *
 * LicenseRef-LICENSE
 *
 * © 1484-2020 Borg Collective
 */
```
