"use strict";

var plugin = require("alamid-plugin");
var merge = require("../merge.js");

/**
 * Merge from env into config.
 *
 * @param {Function} dynamicConfig
 * @param {Object} [options]
 * @param {string} [options.separator=":"]
 * @param {Array} [options.whitelist=[]]
 * @this pluginContext
 */
function envPlugin(dynamicConfig, options) {
    var self = this;
    var separator;
    var whitelist;

    if (options && typeof options === "object") {
        separator = options.separator;
        whitelist = options.whitelist;
    }

    this(dynamicConfig).after("loadConfigFile", function (result) {
        self.override.result = merge(result, process.env, separator, whitelist);
    });
}

module.exports = plugin(envPlugin);
