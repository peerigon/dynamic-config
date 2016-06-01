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
    var config;

    try {
        config = require(filePath);
    } catch (err) {
        // handle only not found errors, throw the rest
        if (err.code === "MODULE_NOT_FOUND") {
            throw new Error("Config not found at '" + filePath + "'");
        }

        throw err;
    }

    return config;
};

dynamicConfig.options = {
    defaultEnv: "develop",
    envName: "env",
    log: false
};

dynamicConfig.use = use;

module.exports = dynamicConfig;
