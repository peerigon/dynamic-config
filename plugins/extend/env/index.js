"use strict";

var plugin = require("alamid-plugin");
var merge = require("../merge.js");

/**
 * Merge from env into config.
 *
 * @param {Function} dynamicConfig
 * @param {string} separator
 * @param {string} whitelist
 * @this pluginContext
 */
function envPlugin(dynamicConfig, separator, whitelist) {
    var self = this;

    this(dynamicConfig).after("loadConfig", function (result) {
        self.override.result = merge(result, process.env, separator, whitelist);
    });
}

module.exports = plugin(envPlugin);
