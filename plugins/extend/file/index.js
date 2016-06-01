"use strict";

var plugin = require("alamid-plugin"),
    fs = require("fs"),
    path = require("path"),
    deepAssign = require("deep-assign");

/**
 * merge from config extension file into the original config
 * @type {Function|*|exports}
 */
var filePlugin = plugin(function (obj, suffix) {
    var self = this;

    // This default means, that the config extension file for config.js has to be named config.local.js
    suffix = suffix || ".local";

    this(obj).after("loadConfig", function (result, args) {
        var configPath = args[0],
            configDir = path.dirname(configPath),
            configExtension = path.extname(configPath),
            configName = path.basename(configPath, configExtension),
            configExtensionPath = path.join(configDir, configName + suffix + configExtension);

        if (fs.existsSync(configExtensionPath)) {
            self.override.result = deepAssign(result, require(configExtensionPath));
        }
    });
});

module.exports = filePlugin;