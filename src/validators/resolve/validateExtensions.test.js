import test from 'ava'
import validateExtensions from './validateExtensions'

/**
 * Failures
 */

test(`fails if input isn't an array`, t => {
  const extensions = 42
  const result = validateExtensions(extensions)
  t.same(result, `Must be an array`)
})

/* Excerpt from  https://webpack.github.io/docs/configuration.html#resolve :
  "IMPORTANT: Setting this option will override the default, meaning that
  webpack will no longer try to resolve modules using the default extensions.
  If you want modules that were required with their extension (e.g. require('./somefile.ext'))
  to be properly resolved, you must include an empty string in your array.
  Similarly, if you want modules that were required without extensions
  (e.g. require('underscore')) to be resolved to files with “.js” extensions,
  you must include ".js" in your array." */
test(`fails if input array doesn't contain ""'`, t => {
  const extensions = ['.js']
  const result = validateExtensions(extensions)
  t.same(result, {warning: `The extensions array should contain "", ` +
         `so that modules that were required with their extension are properly resolved`})
})

test(`fails if input array contains non-strings`, t => {
  const extensions = ['foo', 'bar', '', 1]
  const result = validateExtensions(extensions)
  t.same(result, `Array must contain strings only`)
})

test(`fails if input array contains malformatted extensions`, t => {
  const extensions = ['foo', 'bar', '']
  const result = validateExtensions(extensions)
  t.same(result, `Extensions should start with a period, e.g. ".js"`)
})

/**
 * Passes
 */

test(`passes for valid extensions that include the empty string`, t => {
  const extensions = ['.foo', '.bar', '']
  const result = validateExtensions(extensions)
  t.notOk(result)
})

test(`passes for array containing only empty string`, t => {
  const extensions = ['']
  const result = validateExtensions(extensions)
  t.notOk(result)
})

