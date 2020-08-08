/**
 * Pick up ESM MJS source file, expose as CommonJS
 */
require = require("esm")(module/*, options*/)
module.exports = require("./dist/index.mjs")
