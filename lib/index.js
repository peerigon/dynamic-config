"use strict";

var use = require("alamid-plugin/use.js");

var path = require("path"),
    argv = require("minimist")(process.argv.slice(2));

function dynamicConfig(basePath, fileName) {

    var env = dynamicConfig.getEnv(),
        filePath = dynamicConfig.getFilePath(basePath, env, fileName),
        config;

    if (dynamicConfig.options.log) {
        console.log("Loading configuration '" + fileName + "'  from path '" + filePath + "'");
    }

    config = dynamicConfig.loadConfig(filePath);

    return config;
}

dynamicConfig.getEnv = function() {
    return argv.env || argv.ENV || process.env.env || dynamicConfig.options.defaultEnv;
};

dynamicConfig.getFilePath = function(basePath, env, fileName) {
    return path.join(basePath, env, fileName);
};

dynamicConfig.loadConfig = function(filePath) {
    var config;

    try {
        config = require(filePath);
    }
    catch (err) {

        //handle only not found errors, throw the rest
        if (err.code === "MODULE_NOT_FOUND") {
            throw new Error("Config not found at '" + filePath + "'");
        }

        throw err;
    }

    return config;
};

dynamicConfig.options = {
    defaultEnv: "develop",
    log: false
};

dynamicConfig.use = use;

module.exports = dynamicConfig;
