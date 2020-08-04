# [@renoirb/conventions-use-bili][url-repo] [![npm][shields-npm]][url-npmjs]

Another wrapper to wrap Rollup's wrapper:
[egoist/bili](https://github.com/egoist/bili)

| Size                                | Dependencies                                                             |
| ----------------------------------- | ------------------------------------------------------------------------ |
| ![Bundle size][shields-bundle-size] | ![Libraries.io dependency status for latest release][shields-dependabot] |

[url-npmjs]: https://www.npmjs.com/package/%40renoirb%2Fconventions-use-bili
[url-repo]:
  https://github.com/renoirb/experiments-201908-rush-typescript-just-bili-monorepo/tree/v1.x-dev/conventions/use-bili
[shields-npm]:
  https://img.shields.io/npm/v/%40renoirb%2Fconventions-use-bili?style=flat-square&logo=appveyor&label=npm&logo=npm
[shields-bundle-size]:
  https://img.shields.io/bundlephobia/min/%40renoirb%2Fconventions-use-bili?style=flat-square
[shields-dependabot]:
  https://img.shields.io/librariesio/release/npm/%40renoirb%2Fconventions-use-bili?style=flat-square&logo=appveyor&logo=dependabot

## Usage

The purpose of this utility is to help make sure a package is bundled in an
uniform manner. Also, to make sure at build time checks if the package has
`devDependencies` and `dependencies` for the targetted output whether or not we
`bundleNodeModules`.

To use, create a `bili.config.ts`

```ts
import useBili from '@renoirb/conventions-use-bili'

export default useBili(
  /**
   * First argument is egoist/bili's Config format
   * @type {import('bili').Config}
   */
  {
    input: {
      // If you have more than one entry
      // Otherwise input can be a string directly pointing to 'src/index.js'
      index: 'src/index.ts',
      start: 'src/start.ts',
    },
    // bundleNodeModules will be used to tell which dependencies are required before build
    bundleNodeModules: true,
    output: {
      target: 'node',
      fileName: '[name].cjs',
      minify: false,
    },
  },
)
```
