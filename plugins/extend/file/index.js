"use strict";

var plugin = require("alamid-plugin"),
    fs = require("fs"),
    path = require("path"),
    deepAssign = require("deep-assign");

/**
 * merge from overwrite file into config
 * @type {Function|*|exports}
 */
var filePlugin = plugin(function (obj, suffix) {
    var self = this;

    // This default means, that the overwrite config file for config.js has to be named config.local.js
    suffix = suffix || ".local";

    this(obj).after("loadConfig", function (result, args) {
        var filePath = args[0];
        var overrideFilePath = path.join(
            path.dirname(filePath),
            path.basename(filePath, path.extname(filePath)) + suffix + path.extname(filePath)
        );

        if (fs.existsSync(overrideFilePath)) {
            var overrideConfig = require(overrideFilePath);
            self.override.result = deepAssign(result, overrideConfig);
        }
    });
});

module.exports = filePlugin;