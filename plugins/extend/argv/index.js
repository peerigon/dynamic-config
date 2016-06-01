"use strict";

var plugin = require("alamid-plugin");
var merge = require("../merge.js");
var minimist = require("minimist");

/**
 * Merge arguments from argv into config.
 *
 * @param {Function} dynamicConfig
 * @param {string} separator
 * @param {string} whitelist
 * @this pluginContext
 */
function argvPlugin(dynamicConfig, separator, whitelist) {
    var self = this;

    this(dynamicConfig).after("loadConfig", function (result) {
        self.override.result = merge(result, minimist(process.argv.slice(2)), separator, whitelist);
    });
}

module.exports = plugin(argvPlugin);
