import test from 'ava'
import {friendlyTypeOf} from '../../utils'
import {
  validateStats, validKeysJoined, validDataTypesJoined,
  validStringValuesJoined,
} from './'

const validInputs = [
  true, false, 'normal',
  {hash: true, errors: false},
]

validInputs.forEach(input => {
  test(`passes with ${input}`, t => {
    t.true(validateStats(input) === undefined)
  })
})

test('fails with invalid property type', t => {
  t.same(
    validateStats({context: true}),
    `Unexpected property type. Property \`context\` should be \`string\``
  )
})

test('fails with multiple invalid property types', t => {
  /* eslint max-len:0 */ // just 'cause
  t.same(
    validateStats({assetsSort: 42, cached: true, colors: 'hi'}),
    `Unexpected property types. Property \`assetsSort\` should be \`boolean\` - Property \`colors\` should be \`boolean\``
  )
})

test('fails with invalid key', t => {
  t.same(
    validateStats({foo: false}),
    `Unexpected property: foo. Valid properties are: ${validKeysJoined}`
  )
})

test('fails with invalid keys', t => {
  t.same(
    validateStats({foo: false, bar: true}),
    `Unexpected properties: foo, bar. Valid properties are: ${validKeysJoined}`
  )
})

test('fails with invalid string values', t => {
  t.same(
    validateStats('blah'),
    `Unexpected string value: blah. Valid string values are: ${validStringValuesJoined}`
  )
})

const invalidDataTypes = [
  4, null, new Date(), /regex/, [],
]
invalidDataTypes.forEach(val => {
  const type = friendlyTypeOf(val)
  test(`fails with ${type} input`, t => {
    t.same(
      validateStats(val),
      `Unexpected type: ${type}. Valid types are: ${validDataTypesJoined}`
    )
  })
})

