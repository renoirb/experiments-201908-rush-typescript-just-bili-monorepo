/* eslint-disable @typescript-eslint/no-var-requires */
const { argv, eslintTask, option, resolveCwd, task } = require('just-scripts');

/**
 * See comments in @frontend-bindings/tools-bundling-helpers just.config.js
 */

option('fix');

const eslintTaskOptions = {
  ignorePath: resolveCwd(
    './node_modules/@frontend-bindings/conventions-use-eslint/.eslintignore',
  ),
  fix: argv().fix ? true : false,
  _: ['--report-unused-disable-directives'],
};
task('lint', eslintTask(eslintTaskOptions));
