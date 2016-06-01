"use strict";

import test from "ava";
import path from "path";
import { expect } from "chai";
import loadConfig from "../lib/index";
import a from "./fixtures/configs/a/config";
import b from "./fixtures/configs/b/config";

function config() {
    return loadConfig(path.resolve(__dirname, "fixtures", "configs"), "config.js");
}

test("should accept a defaultEnv", () => {
    loadConfig.options.defaultEnv = "a";

    const conf = config();

    expect(conf).to.eql(a);
});

test("should load the config according to the env", () => {
    loadConfig.options.defaultEnv = "a";

    process.env.env = "b";

    expect(config()).to.eql(b);
});

test("should accept a custom env name via options.envName", () => {
    loadConfig.options.defaultEnv = "a";
    loadConfig.options.envName = "wookie";

    process.env.wookie = "b";

    expect(config()).to.eql(b);
});
