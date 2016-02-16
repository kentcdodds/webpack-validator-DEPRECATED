'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

exports.default = {
  key: 'context',
  validate: validateContext
};


function validateContext(val) {
  var absolute = undefined;
  try {
    absolute = (0, _path.isAbsolute)(val);
  } catch (e) {
    // ignore
  }
  if (!absolute) {
    return 'must be an absolute path';
  }
}