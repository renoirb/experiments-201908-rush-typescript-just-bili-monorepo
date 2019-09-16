/* eslint-disable @typescript-eslint/no-var-requires */
const {
  argv,
  copyTask,
  eslintTask,
  option,
  resolveCwd,
  task,
} = require('just-scripts')

/**
 * See comments in @frontend-bindings/tools-bundling-helpers just.config.js
 */

option('fix')

const eslintTaskOptions = {
  ignorePath: resolveCwd(
    './node_modules/@frontend-bindings/conventions-use-eslint/.eslintignore',
  ),
  fix: argv().fix ? true : false,
  _: ['--report-unused-disable-directives'],
}
task('lint', eslintTask(eslintTaskOptions))

/**
 * Copy files from dist/ie6to8.js for demo in public/
 */
task(
  'copy-to-public',
  copyTask({ paths: ['dist/ie6to8.js'], dest: 'public/dist' }),
)
