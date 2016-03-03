# Webpack Validator

Use this to save yourself some time when working on a webpack configuration.

[![version](https://img.shields.io/npm/v/webpack-validator.svg?style=flat-square)](http://npm.im/webpack-validator)
[![downloads](https://img.shields.io/npm/dm/webpack-validator.svg?style=flat-square)](http://npm-stat.com/charts.html?package=webpack-validator&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/webpack-validator.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**BETA**: This is currently in beta and is a work in progress

Simply do:

```javascript
var validateWebpackConfig = require('webpack-validator')
var config = { /* ... */ }
module.exports = validateWebpackConfig(config)
```

And you'll get helpful error and warning messages telling you when you've got something wrong.

## Installation

```
npm install --save-dev webpack-validator
```

## Support

This module supports validating all [documented properties](http://webpack.github.io/docs/configuration.html) from webpack.
Currently, many of these don't do any actual validation, but it will warn you when you are including a property that is not
documented (which likely means you have a typo, one of the leading causes of webpack fatigue).

## Custom Validators

If you're using a plugin that adds properties to the config, you'll need to add a custom validator that covers that property.
Preferably this would do actual validation, but you can have it be a no-op validator as well.

For example, there are currently no validators written for the `eslint-loader` ([pull requests welcome!](http://makeapullrequest.com)),
So you'll have to stub some out to avoid warnings if you're configuring it as part of your webpack config. Like so:

```javascript
module.exports = validateWebpack({
  // ... your other config
  eslint: { emitError: true },
}, [
  {key: 'eslint', validate: function noop() {}}
])
```

Eventually, the hope is that you'll be able to require in these extra validators and they would actually validate values for you.

## Roadmap

- We're looking to cover all official properties
- We need to make plugin validators
- We need to do actual validation, not just spell-check
- Documenting stuff

## Plugins

This was built with the [configuration-validator](https://github.com/kentcdodds/configuration-validator)
(also in beta) and is fully pluggable. To specify your own validators, simply pass them as additional
arguments.

## LICENSE

MIT

