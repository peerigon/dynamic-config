# dynamic-config

Read config depending on env or argv.

## Example

```javascript
//config/index.js

var dynamicConfig = require("dynamic-config");

//optional options
loadConfig.options.defaultEnv = "develop";
loadConfig.options.log = true;

module.exports = dynamicConfig(__dirname, "config.js");
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












