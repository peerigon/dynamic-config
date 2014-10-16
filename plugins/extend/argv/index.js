"use strict";

var plugin = require("alamid-plugin"),
    merge = require("../merge.js"),
    minimist = require("minimist");

/**
 * merge arguments from argv into config
 *
 * @type {Function|*|exports}
 */
var argvPlugin = plugin(function (obj, separator, whitelist) {

    var self = this;

    this(obj).after("loadConfig", function (result) {
        self.override.result = merge(result, minimist(process.argv.slice(2)), separator, whitelist);
    });
});

module.exports = argvPlugin;