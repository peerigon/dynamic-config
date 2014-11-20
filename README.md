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

```javascript 
node app.js

{ whereami: 'develop' }

# Set environment via args
node app.js --env prod

returns { whereami: 'prod' }


//Set environment via env
export env=stage; node app.js
{ whereami: 'stage' }
```


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

```javascript
node app.js

{ name: 'superApp', port: 9000 }

# Overwrite via argv
node app.js --port 80 //or node app.js --port=80

{ name: 'superApp', port: 80 }

# Overwrite via env
export port=90 node app.js

{ name: 'superApp', port: 90 }

# Order matters
export port=90; node app.js --port 80

{ name: 'superApp', port: 80 }
```














