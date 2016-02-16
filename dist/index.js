'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validators = require('./validators');

var _validators2 = _interopRequireDefault(_validators);

var _lodash = require('lodash.flatten');

var _lodash2 = _interopRequireDefault(_lodash);

var _configurationValidator = require('configuration-validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = webpackValidator;


function webpackValidator(config) {
  for (var _len = arguments.length, otherValidators = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherValidators[_key - 1] = arguments[_key];
  }

  var instanceValidators = (0, _lodash2.default)([].concat(_toConsumableArray(_validators2.default), otherValidators));
  (0, _configurationValidator.configValidator)('Webpack Config', config, instanceValidators);
}