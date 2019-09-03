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
// const DefaultReporter = require('@jest/reporters').DefaultReporter;
let DefaultReporter = require('@jest/reporters/build/default_reporter');
if (!!DefaultReporter.default) {
  DefaultReporter = DefaultReporter.default;
}

/**
 * Jest logs message to stderr. This class is to override that behavior so that
 * rush does not get confused.
 */
class JestReporter extends DefaultReporter {
  constructor(globalConfig) {
    super(globalConfig);
    // See comments in @frontend-bindings/conventions-use-bili in bin/bili #IsCiServer
    const processEnvKeys = Object.keys(process.env);
    const isCI = processEnvKeys.includes('CI_SERVER');
    this.IS_CI = isCI;
    const message = `JestReporter in IS_CI ${isCI}`;
    process.stdout.write('\n' + message + '\n\n');
  }

  log(message) {
    process.stdout.write(message + '\n');
  }
}

module.exports = JestReporter;
