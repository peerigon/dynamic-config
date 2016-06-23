"use strict";

import test from "ava";
import path from "path";
import { expect } from "chai";
import DynamicConfig from "../lib/index";
import a from "./fixtures/configs/a/config";
import b from "./fixtures/configs/b/config";

const dynamicConfig = new DynamicConfig();

function config() {
    return dynamicConfig.load(path.resolve(__dirname, "fixtures", "configs"), "config.js");
}

test("should accept a defaultEnv", () => {
    dynamicConfig.options.defaultEnv = "a";

    const conf = config();

    expect(conf).to.eql(a);
});

test("should load the config according to the env", () => {
    dynamicConfig.options.defaultEnv = "a";

    process.env.env = "b";

    expect(config()).to.eql(b);
});

test("should accept a custom env name via options.envName", () => {
    dynamicConfig.options.defaultEnv = "a";
    dynamicConfig.options.envName = "wookie";

    process.env.wookie = "b";

    expect(config()).to.eql(b);
});
