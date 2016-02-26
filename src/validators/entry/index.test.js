import test from 'ava'
import proxyquire from 'proxyquire'

const utilsStub = {fileExists: p => p.includes('exists')}
const validateEntry = proxyquire('.', {'../../utils': utilsStub})

const {validate} = validateEntry.default

test('passes with a string as a path', t => {
  const entry = './exists'
  t.notOk(validate(entry, {config: {}}))
})

test('fails with a string of a path that does not exist', t => {
  const entry = './fake'
  t.ok(validate(entry, {config: {}}))
})

test('passes with an array of strings', t => {
  const entry = ['./exists1', './exists2']
  const config = {}
  t.notOk(validate(entry, {config}))
})

test('fails with an array of one string that does not exist', t => {
  const entry = ['./exists1', './fake']
  const config = {}
  const message = validate(entry, {config})
  t.ok(message)
  t.false(message.includes(' - '))
  t.true(message.includes('fake'))
  t.false(message.includes('exists1'))
})

test('fails with an array of multiple strings that do not exist', t => {
  const entry = ['./fake1', './exists1', './fake2']
  const config = {}
  const message = validate(entry, {config})
  t.ok(message)
  t.false(message.includes('exists1'))
  t.true(message.includes(' - '))
  t.true(message.includes('fake1'))
  t.true(message.includes('fake2'))
})

test('passes with an object', t => {
  const entry = {
    path1: './exists1',
    path2: ['./exists2', './exists3'],
  }
  const config = {}
  t.notOk(validate(entry, {config}))
})

test('fails with an object with a single failure', t => {
  const entry = {
    path1: './fake1',
    path2: ['./exists1', './exists2'],
  }
  const config = {}
  const message = validate(entry, {config})
  t.false(message.includes('exists1'))
  t.false(message.includes(' - '))
  t.true(message.includes('fake1'))
})

test('fails with an object with multiple failures', t => {
  const entry = {
    path1: './fake1',
    path2: ['./exists1', './fake2', './exists2'],
  }
  const config = {}
  const message = validate(entry, {config})
  t.false(message.includes('exists1'))
  t.true(message.includes(' - '))
  t.true(message.includes('fake1'))
  t.true(message.includes('fake2'))
  t.false(message.includes('fake3'))
})

test(`fails with anything that's not a string, array, or object`, t => {
  const entry = 42
  const config = {}
  const message = validate(entry, {config})
  t.ok(message)
})

