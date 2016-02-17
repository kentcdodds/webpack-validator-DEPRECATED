import test from 'ava'
import path from 'path'
import os from 'os'
import {fileExists} from '.'

test('fileExists returns true for a file', t => {
  t.true(fileExists(__filename))
})

test('fileExists returns true for a directory with an index.js', t => {
  t.true(fileExists(__dirname))
})

test('fileExists returns false for a directory without an index.js', t => {
  const directoryPath = os.tmpdir()
  t.false(fileExists(directoryPath))
})

test('fileExists returns false for a path without a file', t => {
  const tmp = os.tmpdir()
  const filepath = path.join(tmp, tmp)
  t.false(fileExists(filepath))
})


