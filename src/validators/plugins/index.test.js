import test from 'ava'
import pluginsValidator, {isPlugin} from './index'
const {validate} = pluginsValidator

/**
 * Failures
 */

// See https://webpack.github.io/docs/plugins.html
function MockPlugin() {}
MockPlugin.prototype.apply = function apply() {}

test('fails if value is not an array', t => {
  const result = validate('foo')
  t.same(result, 'Should be an array')
})

test('fails if all elements in the array are not plugins', t => {
  const result = validate(['foo'])
  t.same(result, 'Should be an array of webpack plugins')
})

test('plugins are objects or functions', t => {
  t.true(isPlugin(new MockPlugin()))
  t.true(isPlugin(function FunctionPlugin() {}))
  t.false(isPlugin(''))
})


/**
 * Passes
 */

test('passes when array of plugins is passed', t => {
  const FunctionPlugin = function Plugin() {}
  const result = validate([MockPlugin, FunctionPlugin])
  t.notOk(result)
})
