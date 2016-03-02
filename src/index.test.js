var test = require('ava');
var webpackValidator = require('.');
var glob = require('glob');
var path = require('path');

test('check good configs', function(t) {
  glob('../tests/configs/good/*.js', {}, function(err, files) {
    t.ok(files.length > 0);
    files.forEach(function(file) {
      try {
        webpackValidator(require(file), {strict: true});
      } catch (e) {
        throw new Error('Issue with ' + file);
      }
    });
  });
});

test('check bad configs', function(t) {
  glob('../tests/configs/bad/*.js', {}, function(err, files) {
    t.ok(files.length > 0);
    t.plan(files.length);
    files.forEach(function(file) {
      try {
        webpackValidator(require(file), {strict: true});
      } catch (e) {
        t.ok(e);
      }
    });
  });
});

//  t.ok(true);
//});
