import test from 'ava'
import {noop} from 'lodash'

import validateLoader, {formatErrorMessage} from './validateLoader'

/**
 * Failing
 */

test('fails when `test` property is missing', t => {
  const invalidLoader = {loader: 'foo'}
  const result = validateLoader(invalidLoader)
  t.same(
    result,
    formatErrorMessage(
      invalidLoader,
      [`Missing property \`test\` in loader ${JSON.stringify(invalidLoader)}`]
    )
  )
})

test('fails when `loader` and `loaders` property are both defined', t => {
  const invalidLoader = {loader: 'foo', loaders: ['foo', 'bar'], test: /foo/}
  const result = validateLoader(invalidLoader)
  t.same(
    result,
    formatErrorMessage(
      invalidLoader,
      [`Found \`loader\` and \`loaders\`. These properties are mutually exclusive`]
    )
  )
})

test('fails when neither `loader` nor `loaders` property are defined', t => {
  const invalidLoader = {test: /foo/}
  const result = validateLoader(invalidLoader)
  t.same(
    result,
    formatErrorMessage(
      invalidLoader,
      [`Found neither \`loader\` nor \`loaders\``]
    )
  )
})

test('fails when `loader` isn\'t a string', t => {
  const invalidLoader = {loader: ['foo'], test: /foo/}
  const result = validateLoader(invalidLoader)
  t.same(
    result,
    formatErrorMessage(
      invalidLoader,
      [`Expected \`loader\` property to be a string, but got ["foo"]`]
    )
  )
})

test('fails when `loaders` isn\'t an array', t => {
  const invalidLoader = {loaders: 42, test: /foo/}
  const result = validateLoader(invalidLoader)
  t.same(
    result,
    formatErrorMessage(
      invalidLoader,
      [`Expected \`loaders\` property to be an array, but got 42`]
    )
  )
})

test('fails when `loaders` isn\'t an array of strings', t => {
  const invalidLoader = {loaders: [42, 'string'], test: /foo/}
  const result = validateLoader(invalidLoader)
  t.same(
    result,
    formatErrorMessage(
      invalidLoader,
      [`Expected \`loaders\` property to be an array of strings, but got [42,"string"]`]
    )
  )
})

test('fails when `query` & `loaders` are both defined', t => {
  const invalidLoader = {loaders: ['foo'], query: {foo: 'bar'}, test: /foo/}
  const result = validateLoader(invalidLoader)
  t.same(
    result,
    formatErrorMessage(
      invalidLoader,
      [`You can only pass the \`query\` property when you have one \`loader\``]
    )
  )
})

/**
 * Testing properties that take "conditions".
 * (See https://webpack.github.io/docs/configuration.html#module-loaders)
 *
 */
const propertiesWithConditionInputs = ['test', 'exclude', 'include']

const invalidValuesForCondition = [
  1,
  [1],
  [1, 'foo'],
]

const validValuesForCondition = [
  noop,
  'foo',
  /foo/,
  ['foo', 'bar'],
  ['foo', /foo/],
  ['foo', /foo/, noop],
]

propertiesWithConditionInputs.forEach(property => {
  invalidValuesForCondition.forEach(condition => {
    const conditionJson = JSON.stringify(condition)
    test(`fails when \`${property}\` isn\'t a valid condition (condition = ${conditionJson}) `, t => {

      // If the tested property isn't `test`, we supply a passing dummy test so that the
      // relevant property test emits the error
      const invalidLoader = {[property]: condition, loader: 'foo', ...(property !== 'test' && {test: 'foo'})}
      const result = validateLoader(invalidLoader)
      t.same(
        result,
        formatErrorMessage(
          invalidLoader,
          [`Expected \`${property}\` property to be a valid condition, but got ${conditionJson}`]
        )
      )
    })
  })

  validValuesForCondition.forEach(condition => {
    const conditionJson = JSON.stringify(condition)
    test(`passes when \`${property}\` is a valid condition (condition = ${conditionJson}) `, t => {

      // If the tested property isn't `test`, we supply a passing dummy test so that the
      // relevant property test emits the error
      const validLoader = {[property]: condition, loader: 'foo', ...(property !== 'test' && {test: 'foo'})}
      const result = validateLoader(validLoader)
      t.notOk(result)
    })
  })
})

/**
 * Passing
 */

test('passes with valid `test` & `loader`', t => {
  const validLoader = {loader: 'foo', test: 'foo'}
  const result = validateLoader(validLoader)
  t.notOk(result)
})

test('passes with valid `test` & `loaders`', t => {
  const validLoader = {loaders: ['foo!bar', 'baz'], test: /foo/}
  const result = validateLoader(validLoader)
  t.notOk(result)
})

test('passes with valid `test` & `loaders` & `exclude` & `include`', t => {
  const validLoader = {loaders: ['foo!bar', 'baz'], test: /foo/, include: /foo/, exclude: /baz/}
  const result = validateLoader(validLoader)
  t.notOk(result)
})

test('passes with an arbitrary real world loader', t => {
  const realWorldLoader = {
    test: /\.jsx$/,
    include: [
      'app/src',
      /app\/test/,
    ],
    loader: 'babel-loader',
  }
  const result = validateLoader(realWorldLoader)
  t.notOk(result)
})
