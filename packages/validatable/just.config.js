/* eslint-disable @typescript-eslint/no-var-requires */
const { argv, jestTask, option, resolveCwd, task } = require('just-scripts');

// const { justTasksEslint } = require('@frontend-bindings/tools-bundling-helpers');

/**
 * See comments in @frontend-bindings/tools-bundling-helpers just.config.js
 */

option('snapshots');
option('fix');

// justTasksEslint();

// const eslintTaskTaskOptions = {
//   config: resolveCwd('./.eslintrc.js'),
// };
// task('lint', justTasksEslint(eslintTaskTaskOptions));

const jestTaskOptions = {
  runInBand: true,
  config: resolveCwd('./jest.config'),
  updateSnapshot: argv().snapshots ? true : false,
  _: ['--detectOpenHandles'],
};
task('test', jestTask(jestTaskOptions));
