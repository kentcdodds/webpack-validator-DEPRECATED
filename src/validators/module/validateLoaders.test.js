import test from 'ava'

import validateLoaders from './validateLoaders'
import {SEPERATOR} from '../../constants'

/**
 * Failing
 */

test(`fails when input isn't an array`, t => {
  const invalidLoaders = 'foo'
  const result = validateLoaders(invalidLoaders)
  t.same(result, `Expected an array of loader objects, but got foo`)
})

test('separates multiple errors with SEPERATOR', t => {
  const invalidLoaders = ['foo', 'bar']
  const result = validateLoaders(invalidLoaders)
  t.ok(result.split(SEPERATOR).length === invalidLoaders.length)
})

/**
 * Passing
 */
test('passes when input is a array of valid loader objects', t => {
  const validLoaders = [
    {loader: 'foo', test: /foo/},
    {loader: 'foo', test: /foo/},
  ]
  const result = validateLoaders(validLoaders)
  t.notOk(result)
})
