/**
 * Because any console.log makes Rush.js think there had been warnings,
 * we have to tell Jest to use a different output strategy.
 *
 * See notes in following links:
 * https://rushjs.io/pages/maintainer/add_to_repo/
 * https://github.com/Microsoft/web-build-tools/blob/master/core-build/gulp-core-build/src/tasks/JestReporter.ts
 * https://github.com/microsoft/web-build-tools/blob/master/core-build/gulp-core-build/src/tasks/JestTask.ts#L138
 *
 * Or, refactor like this:
 * https://github.com/microsoft/just/blob/master/scripts/jest-reporter.js
 */

let DEFAULT_REPORTER = require('@jest/reporters/build/default_reporter');
if (!!DEFAULT_REPORTER.default) {
  DEFAULT_REPORTER = DEFAULT_REPORTER.default;
}

/**
 * Jest logs message to stderr. This class is to override that behavior so that
 * rush does not get confused.
 */
class JestReporter extends DEFAULT_REPORTER {
  constructor(globalConfig) {
    super(globalConfig);
  }

  log(message) {
    process.stdout.write(message + '\n');
  }
}

module.exports = JestReporter;
