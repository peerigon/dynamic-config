"use strict";

var use = require("alamid-plugin/use.js");
var path = require("path");
var argv = require("minimist")(process.argv.slice(2));

function DynamicConfig(options) {
    options = options && typeof options === "object" ? options : {};

    this.options = {
        defaultEnv: options.defaultEnv || "develop",
        envName: options.envName || "env",
        log: options.hasOwnProperty("log") ? options.log : false
    };

    this.use = use.bind(this);
}

DynamicConfig.prototype.getEnv = function () { // eslint-disable-line complexity
    var envName = this.options.envName;

    return argv[envName] || argv[envName.toUpperCase()] || process.env[envName] || process.env[envName.toUpperCase()] || process.env.NODE_ENV || this.options.defaultEnv;
};

DynamicConfig.prototype.getFilePath = function (basePath, env, fileName) {
    return path.join(basePath, env, fileName);
};

DynamicConfig.prototype.loadConfigFile = function (filePath) {
    return require(filePath);
};

DynamicConfig.prototype.load = function (basePath, fileName) {
    var env = this.getEnv();
    var filePath = this.getFilePath(basePath, env, fileName);
    var config;

    if (this.options.log) {
        // We call it on the console object because this is a nice default which enables you to just pass in console.log.
        // However, any log function can be used.
        this.options.log.call(console, "Loading configuration '" + fileName + "'  from path '" + filePath + "'");
    }

    config = this.loadConfigFile(filePath);

    return config;
};

module.exports = DynamicConfig;
