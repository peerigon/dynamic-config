"use strict";

var use = require("alamid-plugin/use.js");
var path = require("path");
var argv = require("minimist")(process.argv.slice(2));

function dynamicConfig(basePath, fileName) {
    var env = dynamicConfig.getEnv();
    var filePath = dynamicConfig.getFilePath(basePath, env, fileName);
    var config;

    if (dynamicConfig.options.log) {
        console.log("Loading configuration '" + fileName + "'  from path '" + filePath + "'");
    }

    config = dynamicConfig.loadConfig(filePath);

    dynamicConfig.resolvedConfigPath = filePath;

    return config;
}

dynamicConfig.getEnv = function () { // eslint-disable-line complexity
    var envName = dynamicConfig.options.envName;

    return argv[envName] || argv[envName.toUpperCase()] || process.env[envName] || process.env[envName.toUpperCase()] || process.env.NODE_ENV || dynamicConfig.options.defaultEnv;
};

dynamicConfig.getFilePath = function (basePath, env, fileName) {
    return path.join(basePath, env, fileName);
};

dynamicConfig.loadConfig = function (filePath) {
    return require(filePath);
};

dynamicConfig.options = {
    defaultEnv: "develop",
    envName: "env",
    log: false
};

dynamicConfig.use = use;

module.exports = dynamicConfig;
