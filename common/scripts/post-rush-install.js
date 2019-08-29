"use strict";

/**
 * In order to run on Linux/Unix and Windows, we can't use `#!/usr/bin/env node` at the top.
 *
 * After `rush update`, copy files to the monorepo root.
 * https://gist.github.com/renoirb/b23b2d60fbe1ca25950005bb4056458d#gistcomment-3012183
 *
 * @TODO If we want more than one monorepo, yet share configuration. Find way to install/sync in monorepo host.
 */

const path = require("path");
const fs = require("fs");

// For example, ignore files we want in a package, where we can sync.
// where there is a monorepo file called '.prettierignore' in a module
// we know we maintain, and we want that to be synced in the monorepo root.
const filesToCopyToMonorepoRoot = ['conventions/config-prettier/.prettierignore']

/**
 * Copy-pasta/butchery from install-run.js
 * ************************ Is there a better way? ************************ *
 */
let _rushJsonFolder;
function findRushJsonFolder() {
  if (!_rushJsonFolder) {
      let basePath = __dirname;
      let tempPath = __dirname;
      do {
          const testRushJsonPath = path.join(basePath, 'rush.json');
          if (fs.existsSync(testRushJsonPath)) {
              _rushJsonFolder = basePath;
              break;
          }
          else {
              basePath = tempPath;
          }
      } while (basePath !== (tempPath = path.dirname(basePath))); // Exit the loop when we hit the disk root
      if (!_rushJsonFolder) {
          throw new Error('Unable to find rush.json.');
      }
  }
  return _rushJsonFolder;
}
function getNodeModulesPath(rushJsonDir) {
  const packageInstallFolder = path.normalize(path.join(rushJsonDir, 'common', 'temp'))
  try {
      const nodeModulesFolder = path.resolve(packageInstallFolder, 'node_modules');
      const exists = fs.existsSync(nodeModulesFolder)
      if (exists) {
        return nodeModulesFolder;
      }
      throw new Error(`node_modules not found`);
  }
  catch (e) {
      throw new Error(`Error finding the node_modules folder (${packageInstallFolder}): ${e}`);
  }
}
/** ************************ /Is there a better way? ************************ */

/**
 * TODO: Better understand this part.
 * Partial copy-pasta from just-scripts, in `src/tasks/__tests__/callTaskForTest.ts`
 */
function wrapTaskFunction(fn, ctx) {
  return fn.call(ctx, () => ({/* ??? in which situation does this */}));
}

/** @type {import('just-scripts').CopyTaskOptions} */
const copyTaskOpts = {
  // For example, ignore files we want in a package, where we can sync.
  paths: [...filesToCopyToMonorepoRoot],
  dest: '.'
};

(() => {
  /**
   * just-scripts is all we need.
   * As it encapsulates logic to move files around without any more boilerplate.
   */
  const mustHaveDependencyName = 'just-scripts';

  const rushFolder = findRushJsonFolder();
  const nodeModules = getNodeModulesPath(rushFolder);

  try {
    const { copyTask, logger } = require(`${nodeModules}/${mustHaveDependencyName}`);
    // TODO: Improve this.
    logger.enableVerbose = true;
    const  { argv = {} } = process;
    const context = {
        argv: argv || { _: [], $0: '' },
        logger
    };
    // try-catch?
    wrapTaskFunction(copyTask(copyTaskOpts), context);
  } catch (e) {
    const message = `
      Error occured, maybe "${mustHaveDependencyName}" is not installed?
      Make sure its prsent in rush's common/config/rush/common-versions.json as a dependency in "preferredVersions".
      ----
    `;
    throw new Error(message + e);
  }
})();
