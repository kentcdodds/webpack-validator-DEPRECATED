'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var originalConsole = undefined; /* eslint no-console:0 */


(0, _ava2.default)('logs errors', function (t) {
  setup();
  (0, _2.default)({ context: false });
  t.true(console.log.calledOnce);
  t.ok(console.log.calledWithMatch(/context/));
  cleanUp();
});

function setup() {
  originalConsole = console.log;
  console.log = _sinon2.default.spy();
}

function cleanUp() {
  console.log = originalConsole;
}