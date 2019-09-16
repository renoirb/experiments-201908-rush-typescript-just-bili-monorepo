/* eslint-disable @typescript-eslint/no-var-requires */
const {
  argv,
  cleanTask,
  defaultCleanPaths,
  eslintTask,
  jestTask,
  option,
  resolveCwd,
  task,
} = require('just-scripts')

/**
 * INCOMPLETE:
 * This should contain notes from past experiments.
 * Even though they aren't used in this package.
 * Either we keep using just, or not.
 *
 * Objective of using just-scripts is:
 * 1. Have ONE common set of commands
 * 1. Re-usable between projects, without having to copy-paste around
 *
 * If none of the above is possible, we won't need just-scripts.
 * There is no need of using just-scripts IF we can only use THE SAME SET of scripts in package.json
 * Set aside for now.
 *
 * ----
 *
 * This replicates pretty much just-scripts at src/task-presets/lib.ts
 *
 * But we want to bring in:
 * - @microsoft/eslint-config-scalable-ts
 * - our own prettier config
 * - our own jest config
 */

/**
 * Notice the following CLI flags ONLY WORK if we call them directly
 * `npx just-scripts test --snapshots`, not when we use `rushx test --snapshots`,
 * nor when we do globally `rush test --snapshots`.
 * Gota figure why. @TODO
 */
option('snapshots')
option('fix')

task('clean', cleanTask([...defaultCleanPaths(), '.rpt2_cache']))

const jestTaskOptions = {
  runInBand: true,
  config: resolveCwd('./jest.config'),
  /**
   * To update snapshots, you can't use `rushx test --snapshots`, but rather
   * use `rush test --snapshots` and all package snapshots will be updated.
   * That is because rushx runner does not pass argv.
   * Alternatively, you can use `rushx test:snapshots`.
   */
  updateSnapshot: argv().snapshots ? true : false,
  _: ['--detectOpenHandles'],
}
task('test', jestTask(jestTaskOptions))

const eslintTaskOptions = {
  ignorePath: resolveCwd(
    './node_modules/@frontend-bindings/conventions-use-eslint/.eslintignore',
  ),
  fix: argv().fix ? true : false,
  _: ['--report-unused-disable-directives'],
}
task('lint', eslintTask(eslintTaskOptions))

// --------------------- Unfinished experiments ---------------------

/**
 * See tools/bundling-helpers/src/just-tasks/eslint.ts
 *
 * ```js
 * const { justTasksEslint } = require('@frontend-bindings/tools-bundling-helpers');
 * const eslintTaskTaskOptions = {
 *   config: resolveCwd('./.eslintrc.js'),
 * };
 * task('lint', justTasksEslint(eslintTaskTaskOptions));
 * ```
 */
