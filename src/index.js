function isntEmpty(obj) {
  return Object.keys(obj).length > 0;
}

function isString(x) {
  return typeof x === 'string';
}

function isStringOrNotEmptyObject(x) {
  return isString(x) || isntEmpty(x);
}

var allowedThings = {
  "entry": isStringOrNotEmptyObject,
  "module": { loaders: Array.isArray },
  "output": { path: isString, filename: isString },
  "plugins": Array.isArray,
  "devtool": isString,
  "context": isString,
  "resolve": {
    modulesDirectories: Array.isArray,
    extensions: Array.isArray,
    alias: isntEmpty
  }
};

function getBadConfig(config, allowed) {
  return Object.keys(config).filter(function(key) {
        var isGood = false;
        if (allowed[key]) {
          isGood = true;
          if (typeof allowed[key] === 'function') {
            isGood = allowed[key](config[key]);
          } else if (typeof allowed[key] === 'object') {
            // console.log(allowedThings[key], config[key])
            var bads = getBadConfig(config[key], allowed[key]);
            isGood = (bads.length === 0);
            if (!isGood) {
              console.log(allowed[key], config[key])
            }
          }
        }
        return !isGood;
      }) || [];
}

module.exports = function(config) {
  return getBadConfig(config, allowedThings).forEach(function(key) {
    console.error("Unexpected key \"" + key + "\" found in config.");
  });
  return config;
}
