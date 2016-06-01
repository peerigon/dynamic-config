"use strict";

var plugin = require("alamid-plugin");
var fs = require("fs");
var path = require("path");
var deepAssign = require("deep-assign");

/**
 * Merge from env into config.
 *
 * @param {Function} dynamicConfig
 * @param {string} suffix
 * @this pluginContext
 */
function filePlugin(dynamicConfig, suffix) {
    var self = this;

    // This default means, that the config extension file for config.js has to be named config.local.js
    suffix = suffix || ".local";

    this(dynamicConfig).after("loadConfig", function (result, args) {
        var configPath = args[0];
        var configDir = path.dirname(configPath);
        var configExtension = path.extname(configPath);
        var configName = path.basename(configPath, configExtension);
        var configExtensionPath = path.join(configDir, configName + suffix + configExtension);

        if (fs.existsSync(configExtensionPath)) {
            self.override.result = deepAssign(result, require(configExtensionPath));
        }
    });
}

module.exports = plugin(filePlugin);
