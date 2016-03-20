import test from 'ava'
import validateRoot from './validateRoot'
import {absolutePath} from '../../../tests/fixtures'

/**
 * Failures
 */

test(`fails if input isn't a string or array'`, t => {
  const root = 1
  const result = validateRoot(root)
  t.same(result, `Must be a string or array`)
})

test(`fails if input is an array that contains relative paths`, t => {
  const root = ['./foo', 'bar']
  const result = validateRoot(root)
  t.same(result, `Every element of the array must be an absolute path`)
})

test(`fails if input is a relative path`, t => {
  const root = './foo'
  const result = validateRoot(root)
  t.same(result, `Must be an absolute path`)
})


/**
 * Passes
 */

test(`passes if input is an absolute path`, t => {
  const root = absolutePath
  const result = validateRoot(root)
  t.notOk(result)
})

test(`passes if input is an array of absolute paths`, t => {
  const root = [absolutePath, absolutePath]
  const result = validateRoot(root)
  t.notOk(result)
})
