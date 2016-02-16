import test from 'ava'
import contextValidator from '.'
const {validate} = contextValidator

test('passes with an absolute path', t => {
  const absolutePath = '/foo/bar/baz'
  const result = validate(absolutePath)
  t.notOk(result)
})

test('returns error if not given an absolute path', t => {
  const relativePath = 'foo/bar'
  const result = validate(relativePath)
  t.ok(result)
})


