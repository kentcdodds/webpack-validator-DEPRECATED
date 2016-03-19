import test from 'ava'

import validateEntry from './index'
const {validate} = validateEntry

/**
 * Valid cases
 */

test('passes with a string', t => {
  const entry = 'foo'
  t.notOk(validate(entry, {config: {}}))
})

test('passes with an array of strings', t => {
  const entry = ['foo', 'bar']
  const config = {}
  t.notOk(validate(entry, {config}))
})

test('passes with an object that contains valid values', t => {
  const entry = {
    path1: 'foo',
    path2: ['foo', 'bar'],
  }
  const config = {}
  t.notOk(validate(entry, {config}))
})


/**
 * Invalid cases
 */

test(`fails with anything that's not a string, array, or object`, t => {
  const entry = 42
  const config = {}
  const message = validate(entry, {config})
  t.ok(message)
})

test('fails with an array of one string and one non-string', t => {
  const entry = ['string', 1]
  const config = {}
  const message = validate(entry, {config})
  t.ok(message)
  t.false(message.includes('\n')) // Only one error
})

test('fails with an array of with only non-strings', t => {
  const entry = [1, 1]
  const config = {}
  const message = validate(entry, {config})
  t.ok(message)
  const messages = message.split('\n')
  t.ok(messages.length === 2)
})

test('fails with an object with nested failures', t => {
  const entry = {
    path1: 1,
    path2: [2, 'foo'],
  }
  const config = {}
  const message = validate(entry, {config})
  const messages = message.split('\n')
  t.ok(messages.length === 2)
  t.ok(messages[0].includes('1'))
  t.ok(messages[1].includes('2'))
})


