# dynamic-config

Read config depending on env or argv.

## Example

```javascript
//config/index.js

var dynamicConfig = require("dynamic-config");

//optional options
dynamicConfig.options.defaultEnv = "develop";
dynamicConfig.options.log = true;

var config = dynamicConfig(__dirname, "config.js");

//log the resolved config path (e.g. /etc/myapp/develop/config.js)
console.log(dynamicConfig.resolvedConfigPath);

module.exports = config;
```

```javascript
//app.js
var config = require("./config");

console.log(config);
```

__Default__

`node app.js`

`{ whereami: 'develop' }`

__Argv__

`node app.js --env prod`

`{ whereami: 'prod' }`


__Env__

`env=stage; node app.js`

`{ whereami: 'stage' }`

## Plugins

### extend()

```javascript

"use strict";

var dynamicConfig = require("dynamic-config");

//extend from env
dynamicConfig.use(require("dynamic-config/plugins/extend/env"));

//extend from argv
dynamicConfig.use(require("dynamic-config/plugins/extend/argv"));

module.exports = dynamicConfig(__dirname, "config.js");
```

`node app.js`

`{ name: 'superApp', port: 9000 }`

__overwrite via argv__

`node app.js --port 80` or `node app.js --port=80`

`{ name: 'superApp', port: 80 }`

__overwrite via env__

`export port=90 node app.js`

`{ name: 'superApp', port: 90 }`

__The order matters..__

`export port=90; node app.js --port 80`

`{ name: 'superApp', port: 80 }`














