const {
  task,
  prettierTask,
  jestTask,
  resolveCwd,
  option,
  argv,
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

const prettierTaskOptions = {
  ignorePath: resolveCwd(
    './node_modules/@frontend-bindings/conventions-use-prettier/.prettierignore',
  ),
};
task('fix', prettierTask(prettierTaskOptions));
