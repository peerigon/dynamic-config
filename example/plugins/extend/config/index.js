"use strict";

var dynamicConfig = require("../../../../lib");

dynamicConfig.use(require("../../../../plugins/extend/env"));
dynamicConfig.use(require("../../../../plugins/extend/argv"));

module.exports = dynamicConfig(__dirname, "config.js");
