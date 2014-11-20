"use strict";

var loadConfig = require("../../lib/index.js");

loadConfig.options.defaultEnv = "develop";

module.exports = loadConfig(__dirname, "config.js");