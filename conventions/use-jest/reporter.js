/**
 * Might not be needed anymore.
 *
 * Make sure @jest/reporters/build/default_reporter.js and base_reporter.js DO NOT USE `console.log(...)` but rather
 * `process.stderr.write(message + '\n');`
 *
 * As of jest 24.9.0, it is no longer required to rewrite reporter.
 *
 * If we wanted to make a different behavior, we could re-use this file.
 *
 * -------
 *
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
let { DefaultReporter } = require('@jest/reporters')
// console.log('DefaultReporter', DefaultReporter)

// let DefaultReporter = require('@jest/reporters/build/default_reporter');
if (!!DefaultReporter.default) {
  DefaultReporter = DefaultReporter.default
}

// console.log('DefaultReporter 2', DefaultReporter)

/**
 * Jest logs message to stderr. This class is to override that behavior so that
 * rush does not get confused.
 */
class JestReporter extends DefaultReporter {
  constructor(globalConfig) {
    super()
    this._globalConfig = Object.assign({}, this._globalConfig, globalConfig)
    // See comments in @renoirb/conventions-use-bili in bin/bili #IsCiServer
    const processEnvKeys = Object.keys(process.env)
    const isCI = processEnvKeys.includes('CI_SERVER')
    this.IS_CI = isCI
    // const message = `JestReporter in IS_CI ${isCI}`;
    // process.stdout.write('\n' + message + '\n\n');
  }

  log(message) {
    process.stdout.write(message + '\n')
  }
}

module.exports = JestReporter
