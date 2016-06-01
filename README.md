# dynamic-config

Loads configuration files depending on:

  - argv: `node app.js --env production`
  - env: `export NODE_ENV=production; node app.js`

Expects a `.js` file as config so you can add dynamic content.

## Installation

```
npm install dynamic-config
```

## Options

### defaultEnv: String, (default: develop)

Define which env should be set as default.

### log: Boolean (default: false)

Enable logging of path/env resolution.

### envName: String (default: env)

The argument/env variable name we expect.

## Example

```javascript
// config/index.js

var dynamicConfig = require("dynamic-config");

// Optional options
dynamicConfig.options.defaultEnv = "develop";
dynamicConfig.options.log = true;

var config = dynamicConfig(__dirname, "config.js");

// Log the resolved config path (e.g. /etc/myapp/develop/config.js)
console.log(dynamicConfig.resolvedConfigPath);

module.exports = config;
```

```javascript
// config/develop/config.js

module.exports = {
  whereami: "develop"
}
```

```javascript
// app.js
var config = require("./config");

console.log(config);
```

```javascript
node app.js

{ whereami: 'develop' }

// Set environment via args
node app.js --env prod

{ whereami: 'prod' }

// Set environment via env
export env=stage; node app.js

{ whereami: 'stage' }
```





## Plugins

### extend

These plugins allow you to override specific config fields by applying them via env, argv or a separate local config file.

```javascript
var dynamicConfig = require("dynamic-config");

// extend from env
dynamicConfig.use(require("dynamic-config/plugins/extend/env"));

// extend from argv
dynamicConfig.use(require("dynamic-config/plugins/extend/argv"));

// extend from file
dynamicConfig.use(require("dynamic-config/plugins/extend/file"));

module.exports = dynamicConfig(__dirname, "config.js");
```

```javascript
node app.js

{ name: 'superApp', port: 9000 }

// Overwrite via argv
node app.js --port 80 //or node app.js --port=80

{ name: 'superApp', port: 80 }

// Overwrite via env
export port=90 node app.js

{ name: 'superApp', port: 90 }

// Order matters...
export port=90; node app.js --port 80

{ name: 'superApp', port: 80 }
```

#### Extend via file
Create a file named the same as your config, but contains `.local` in front of the extension, like `config.js` becomes `config.local.js`.

In the config extension file you can define any subset of the object, that is defined in the main config and it would overwrite the corresponding value. Both configs are merged via [deep-assign](https://github.com/sindresorhus/deep-assign).

```javascript
// config.js
module.exports = {
    a: 1,
    b: {
        c: "c",
        d: 2
    },
    e: 3
}

// config.local.js
module.exports = {
    e: "e",
    b: {
        d: "d"
    }
}

// result
{
    a: 1,
    b: {
        c: "c",
        d: "d"
    },
    e: "e"
}
```
