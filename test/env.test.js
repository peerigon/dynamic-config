"use strict";

import path from "path";
import test from "ava";
import { expect } from "chai";
import envPlugin from "../plugins/extend/env"; // eslint-disable-line no-unused-vars
import DynamicConfig from "../lib/index";
import develop from "./fixtures/configs/develop/config";

const envPropertiesToClear = [
    "env",
    "whereAmI",
    "server:host"
];

test.afterEach(() => {
    envPropertiesToClear.forEach(prop => delete process.env[prop]);
});

const loadArgs = [path.resolve(__dirname, "fixtures", "configs"), "config.js"];

test("Should merge top level configuration options passed via env (export whereAmI=envExtended)", () => {
    const dynamicConfig = new DynamicConfig({});

    dynamicConfig.use(envPlugin);

    process.env.whereAmI = "envExtended";

    const conf = dynamicConfig.load(...loadArgs);

    expect(conf.whereAmI).to.eql(process.env.whereAmI);
});

test("Should not merge whitelisted env vars (export whereAmI=envExtended)", () => {
    const dynamicConfig = new DynamicConfig({
        whitelist: ["whereAmI"]
    });

    dynamicConfig.use(envPlugin);

    process.env.whereAmI = "envExtended";

    const conf = dynamicConfig.load(...loadArgs);

    expect(conf.whereAmI).to.eql(develop.whereAmI);
});

test("Should merge nested configuration options passed via env (export server:host=npm.com)", () => {
    const dynamicConfig = new DynamicConfig({});

    dynamicConfig.use(envPlugin);

    process.env["server:host"] = "npm.com";

    const conf = dynamicConfig.load(...loadArgs);

    expect(conf.server.host).to.eql(process.env["server:host"]);
});

test("Should merge nexted configuration using a custom seperator via env (export server--host=npm.com)", () => {
    const dynamicConfig = new DynamicConfig({
        seperator: "--"
    });

    dynamicConfig.use(envPlugin);

    process.env["server--host"] = "npm.com";

    const conf = dynamicConfig.load(...loadArgs);

    expect(conf.server.host).to.eql(process.env["server--host"]);
});

test("Should merge nexted configuration using a custom seperator via env (export server--host=npm.com)", () => {
    const dynamicConfig = new DynamicConfig({
        seperator: "--"
    });

    dynamicConfig.use(envPlugin);

    process.env["server--host"] = "npm.com";

    const conf = dynamicConfig.load(...loadArgs);

    expect(conf.server.host).to.eql(process.env["server--host"]);
});
