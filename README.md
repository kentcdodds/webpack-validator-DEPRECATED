# Webpack Validator

## DEPRECATED

This repo has been deprecated in favor of [this one](https://github.com/jonathanewerner/webpack-validator)

---

Use this to save yourself some time when working on a webpack configuration.

[![Build Status](https://img.shields.io/travis/kentcdodds/webpack-validator.svg?style=flat-square)](https://travis-ci.org/kentcdodds/webpack-validator)
[![Code Coverage](https://img.shields.io/codecov/c/github/kentcdodds/webpack-validator.svg?style=flat-square)](https://codecov.io/github/kentcdodds/webpack-validator)
[![version](https://img.shields.io/npm/v/webpack-validator.svg?style=flat-square)](http://npm.im/webpack-validator)
[![downloads](https://img.shields.io/npm/dm/webpack-validator.svg?style=flat-square)](http://npm-stat.com/charts.html?package=webpack-validator&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/webpack-validator.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

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

## semver

Because this module is intended to catch errors in your config, we'll work similar to how ESLint has done semver:

```
#.#.#
Major.Minor.Patch
```

- Major - When there's a change with the public facing webpack-validator API where you'd have to change how you're using it
- Minor - When there's a new feature or validator
- Patch - When there's a bug fix to an existing API or validator (in a non-breaking way)

The most different part of all of this is the fact that if you're depending on `webpack-validator` as part of your build process and you fail if there are errors, then you could experience a problem in a `minor` update when a new validator is added or updated and catches a problem in your configuration. If you're going to be doing this, we recommend that you lock down your version of `webpack-validator` and only update explicitly.

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

