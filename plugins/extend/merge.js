"use strict";

/**
 * Set <value> for <keyPath> on <config>.
 *
 * @param {Object} config
 * @param {Array|string} keyPath
 * @param {*} value
 */
function applyKey(config, keyPath, value) {
    var currentKey;

    if (Array.isArray(keyPath)) {
        if (config[keyPath[0]] === undefined) { // eslint-disable-line no-undefined
            return;
        }

        currentKey = keyPath.shift();

        if (keyPath.length === 0) {
            config[currentKey] = value;
            return;
        }

        applyKey(config[currentKey], keyPath, value);
    }
}

/**
 * Merge <config> with <extension> split by <separator> exclude <whitelist>.
 *
 * @param {Object} config
 * @param {Object} extension
 * @param {string} [separator=":"]
 * @param {Array} [whitelist=[]]
 * @returns {Object}
 */
function merge(config, extension, separator, whitelist) {
    whitelist = whitelist || [];
    separator = separator || ":";

    Object
        .keys(extension)
        .filter(function (key) {
            return !whitelist.length || whitelist.indexOf(key) !== -1;
        })
        .forEach(function (key) {
            applyKey(config, key.split(separator), extension[key]);
        });

    return config;
}

module.exports = merge;
