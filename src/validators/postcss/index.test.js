import test from 'ava'
import postcssValidator from './index'
const {validate} = postcssValidator

test('passes with a function that returns an array', t => {
  const input = () => ['foo']
  const result = validate(input)
  t.notOk(result)
})

test(`passes with a function that returns an object who's values are arrays`, t => {
  const input = () => ({foo: ['bar'], baz: ['bar']})
  const result = validate(input)
  t.notOk(result)
})

test(`fails for non-function input`, t => {
  const input = ['foo']
  const result = validate(input)
  t.ok(result)
})

test(`fails if function returns something different than a) an object whose values are arrays or b) an array`, t => {
  const input = () => 'foo'
  const result = validate(input)
  t.ok(result)
})

