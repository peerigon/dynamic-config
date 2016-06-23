"use strict";

import test from "ava";
import path from "path";
import { expect } from "chai";
import DynamicConfig from "../lib/index";
import a from "./fixtures/configs/a/config";
import b from "./fixtures/configs/b/config";

const envPropertiesToClear = [
    "env",
    "wookie"
];
const loadArgs = [path.resolve(__dirname, "fixtures", "configs"), "config.js"];

test.afterEach(() => {
    envPropertiesToClear.forEach(prop => delete process.env[prop]);
});

test("Should accept a defaultEnv", () => {
    const dynamicConfig = new DynamicConfig({
        defaultEnv: "a"
    });

    dynamicConfig.options.defaultEnv = "a";

    const conf = dynamicConfig.load(...loadArgs);

    expect(conf).to.eql(a);
});

test("Should load the config according to the env", () => {
    const dynamicConfig = new DynamicConfig();

    process.env.env = "b";

    expect(dynamicConfig.load(...loadArgs)).to.eql(b);
});

test("Should accept a custom env name via options.envName", () => {
    const dynamicConfig = new DynamicConfig({
        envName: "wookie"
    });

    process.env.wookie = "b";

    expect(dynamicConfig.load(...loadArgs)).to.eql(b);
});

test("Should preserve stack traces", () => {
    const dynamicConfig = new DynamicConfig({
        defaultEnv: "withError"
    });
    let err;

    try {
        dynamicConfig.load(...loadArgs);
    } catch (e) {
        err = e;
    }
    expect(err.stack).to.contain("Cannot find module './does-not-exist'");
    expect(err.stack).to.contain("fixtures/configs/withError/config.js:1:1");
});

test("Should use the provided log function", () => {
    const dynamicConfig = new DynamicConfig({
        defaultEnv: "a",
        log(str) {
            hasBeenCalled = true;
            expect(str).to.contain(path.resolve(__dirname, "fixtures", "configs", "a", "config.js"));
            expect(this).to.equal(console, "Has called options.log on console");
        }
    });
    let hasBeenCalled = false;

    dynamicConfig.load(...loadArgs);
    expect(hasBeenCalled).to.equal(true, "Has called options.log");
});
