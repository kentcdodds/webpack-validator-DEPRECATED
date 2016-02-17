# Webpack Validator

[![version](https://img.shields.io/npm/v/webpack-validator.svg?style=flat-square)](http://npm.im/webpack-validator)
[![downloads](https://img.shields.io/npm/dm/webpack-validator.svg?style=flat-square)](http://npm-stat.com/charts.html?package=webpack-validator&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/webpack-validator.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Use this to save yourself some time when working on a webpack configuration.

**BETA**: This is currently in beta and is a work in progress

Simply do:

```javascript
var validateWebpackConfig = require('webpack-validator')
var config = { ... }
module.exports = validateWebpackConfig(config)
```

And you'll get helpful error and warning messages telling you when you've got something wrong.

## Installation

```
npm install --save-dev webpack-validator
```

## Support

This is just the beginning. Here are the lists of properties this currently validates:

- `context`

## Roadmap

- We're looking to cover all official properties
- Documenting stuff
- Log out any property that is not covered by a validator (helps for typos)

## Plugins

This was built with the [configuration-validator](https://github.com/kentcdodds/configuration-validator)
(also in beta) and is fully pluggable. To specify your own validators, simply pass them as additional
arguments.

## LICENSE

MIT

