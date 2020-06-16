'use strict'

const Papa = require('papaparse')

/**
 * Transform CSV files for Jest
 *
 * Thanks:
 * - https://github.com/joscha/ts-jest-transformer-example/blob/master/tools/fileTransformer.js
 * - https://github.com/joscha/ts-jest-transformer-example/blob/master/jestconfig.json
 * - https://github.com/jmarceli/custom-jest-transformer/blob/master/jest-csv-transformer.js
 * - https://github.com/kristerkari/react-native-svg-transformer#usage-with-jest
 * - https://jestjs.io/docs/en/manual-mocks
 */
module.exports = {
  process(fileContent) {
    return (
      'export default ' + JSON.stringify(Papa.parse(fileContent).data) + ';'
    )
  },
}
