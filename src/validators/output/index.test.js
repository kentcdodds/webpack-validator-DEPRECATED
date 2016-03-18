import test from 'ava'
import * as outputValidators from './index'

const absolutePath = process.platform === 'win32' ? 'C://foo/bar/baz' : '/foo/bar/baz'
const relativePath = 'foo/bar'

runOutputFileNameTests(outputValidators.validateOutputFileName)
runOutputPathTests(outputValidators.validateOutputPath)

function runOutputFileNameTests(validate) {
  test('passes with a relative path', t => {
    const output = {filename: relativePath}
    const result = validate(output.filename)
    t.notOk(result)
  })

  test('returns error if given an absolute path', t => {
    const output = {filename: absolutePath}
    const result = validate(output.filename)
    t.ok(result)
  })

}

function runOutputPathTests(validate) {
  test('passes with an absolute path', t => {
    const output = {filename: absolutePath}
    const result = validate(output.filename)
    t.notOk(result)
  })

  test('returns error if not given an absolute path', t => {
    const output = {filename: relativePath}
    const result = validate(output.filename)
    t.ok(result)
  })

}


