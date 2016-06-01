"use strict";

var plugin = require("alamid-plugin");
var merge = require("../merge.js");
var minimist = require("minimist");

/**
 * Merge arguments from argv into config.
 *
 * @param {Function} dynamicConfig
 * @param {Object} [options]
 * @param {string} [options.separator=":"]
 * @param {Array} [options.whitelist=[]]
 * @this pluginContext
 */
function argvPlugin(dynamicConfig, options) {
    var self = this;
    var separator;
    var whitelist;

    if (typeof options === "string") {
        console.warn("Passing options as separate arguments to a dynamic-config plugin is deprecated. Use an options object instead. This will be removed in the next major version.");
        separator = arguments[1];
        whitelist = arguments[2];
    } else {
        separator = options.separator;
        whitelist = options.whitelist;
    }

    this(dynamicConfig).after("loadConfig", function (result) {
        self.override.result = merge(result, minimist(process.argv.slice(2)), separator, whitelist);
    });
}

module.exports = plugin(argvPlugin);
