'use strict'

const path = require('path')
const { transpileIfTypescript } = require('ts-jest')

/**
 * File Transformer
 *
 * Basically just making a JSON.stringify of anything we pass in.
 *
 * Bookmarks:
 * - https://github.com/joscha/ts-jest-transformer/
 * - https://github.com/joscha/ts-jest-transformer-example/blob/0d13f63/tools/fileTransformer.js
 */
class TsJestTransformer {
  process(src, filename, config, options) {
    return transpileIfTypescript(
      `${filename}.ts`,
      src,
      config && config.globals,
    )
  }
}

class FileTransformer extends TsJestTransformer {
  process(src, filename, config, options) {
    let source = `// FileTransformer extends TsJestTransformer \n// src: ${src}\n// filename: ${filename}\n\n`
    source += 'export default ' + JSON.stringify(path.basename(filename)) + ';'
    return super.process(source, filename, config, options)
  }
}

const instance = new FileTransformer()

module.exports = {
  FileTransformer,
  default: instance,
  TsJestTransformer,
}
