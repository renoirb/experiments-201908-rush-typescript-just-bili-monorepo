/* eslint-disable @typescript-eslint/no-var-requires */
const {
  argv,
  eslintTask,
  jestTask,
  option,
  resolveCwd,
  task,
} = require('just-scripts');

/**
 * See comments in @frontend-bindings/tools-bundling-helpers just.config.js
 */

option('snapshots');
option('fix');

const jestTaskOptions = {
  runInBand: true,
  config: resolveCwd('./jest.config'),
  updateSnapshot: argv().snapshots ? true : false,
  _: ['--detectOpenHandles'],
};
task('test', jestTask(jestTaskOptions));

const eslintTaskOptions = {
  ignorePath: resolveCwd(
    './node_modules/@frontend-bindings/conventions-use-eslint/.eslintignore',
  ),
  fix: argv().fix ? true : false,
  _: ['--report-unused-disable-directives'],
};
task('lint', eslintTask(eslintTaskOptions));
