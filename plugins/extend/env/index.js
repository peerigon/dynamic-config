"use strict";

var plugin = require("alamid-plugin"),
    merge = require("../merge.js");

/**
 * merge from env into config
 * @type {Function|*|exports}
 */
var envPlugin = plugin(function (obj, separator, whitelist) {

    var self = this;

    this(obj).after("loadConfig", function (result) {
        self.override.result = merge(result, process.env, separator, whitelist);
    });
});

module.exports = envPlugin;