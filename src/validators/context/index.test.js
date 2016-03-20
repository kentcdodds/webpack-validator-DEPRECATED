import test from 'ava'
import contextValidator from './index'
const {validate} = contextValidator
import {absolutePath} from '../../../tests/fixtures'

test('passes with an absolute path', t => {
  const result = validate(absolutePath)
  t.notOk(result)
})

test('returns error if not given an absolute path', t => {
  const relativePath = 'foo/bar'
  const result = validate(relativePath)
  t.ok(result)
})


