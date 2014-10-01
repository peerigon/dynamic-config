"use strict";

var path = require("path"),
    argv = require('minimist')(process.argv.slice(2));

function readDynamicConfig(basePath, fileName) {
    var env = process.env.env || argv.env || argv.ENV || readDynamicConfig.options.defaultEnv,
        filePath = path.join(basePath, env, fileName),
        config;

    if (readDynamicConfig.options.log) {
        console.log("Loading configuration '" + fileName + "'  from path '" + filePath + "'");
    }

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
}

readDynamicConfig.options = {
    defaultEnv: "develop",
    log: false
};

module.exports = readDynamicConfig;