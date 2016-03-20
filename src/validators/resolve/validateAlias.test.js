import test from 'ava'
import validateAlias from './validateAlias'

/**
 * Failures
 */

test('fails if no plain object is passed in', t => {
  const alias = ['foo']
  const result = validateAlias(alias)
  t.same(result, `Alias should be a plain object`)
})

test(`fails if object's values aren't strings'`, t => {
  const alias = {foo: 'bar', foo$: 1}
  const result = validateAlias(alias)
  t.same(result, `Alias object's values should be strings`)
})


/**
 * Passes
 */

test(`passes if input is an object with string values`, t => {
  const alias = {foo: 'bar', foo$: 'baz'}
  const result = validateAlias(alias)
  t.notOk(result)
})

test(`passes if input is an empty object`, t => {
  const alias = {}
  const result = validateAlias(alias)
  t.notOk(result)
})
