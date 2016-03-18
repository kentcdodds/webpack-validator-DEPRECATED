import test from 'ava'
import debugValidator from './index'
const {validate} = debugValidator

test('passes with a boolean value', t => {
  const debug = false
  t.notOk(validate(debug))
})

test('fails with a non boolean value', t => {
  const debug = 'someValue'
  t.ok(validate(debug))
})
