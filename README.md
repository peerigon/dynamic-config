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

//Path to the last loaded config file (e.g. /etc/myapp/develop/config.js)
console.log(dynamicConfig.last);

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












