import test from 'ava'

import validateLoadersEntry from './validateLoadersEntry'
import {SEPERATOR} from '../../constants'

/**
 * Failing
 */

test(`fails when input isn't an array`, t => {
  const invalidLoaders = 'foo'
  const result = validateLoadersEntry(invalidLoaders)
  t.same(result, `Expected an array of loader objects, but got foo`)
})

test('seperates multiple errors with SEPERATOR', t => {
  const invalidLoaders = ['foo', 'bar']
  const result = validateLoadersEntry(invalidLoaders)
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
  const result = validateLoadersEntry(validLoaders)
  t.notOk(result)
})
