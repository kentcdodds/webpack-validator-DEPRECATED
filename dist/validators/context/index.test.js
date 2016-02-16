'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = _2.default.validate;


(0, _ava2.default)('passes with an absolute path', function (t) {
  var absolutePath = '/foo/bar/baz';
  var result = validate(absolutePath);
  t.notOk(result);
});

(0, _ava2.default)('returns error if not given an absolute path', function (t) {
  var relativePath = 'foo/bar';
  var result = validate(relativePath);
  t.ok(result);
});