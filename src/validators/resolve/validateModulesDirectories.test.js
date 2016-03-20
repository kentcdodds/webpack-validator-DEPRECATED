import test from 'ava'
import validateModulesDirectories from './validateModulesDirectories'

/**
 * Failures
 */

test(`fails if input isn't an array`, t => {
  const modulesDirectories = 42
  const result = validateModulesDirectories(modulesDirectories)
  t.same(result, `Must be an array`)
})

// Who doesn't want node_modules in their search path? 99.99% accidental.
test(`fails if input doesn't contain "node_modules"'`, t => {
  const modulesDirectories = ['foo']
  const result = validateModulesDirectories(modulesDirectories)
  t.same(result, {warning: `"node_modules" is missing. This means that modules from \`node_modules\` won't be found'`})
})

test(`fails if input array contains a path`, t => {
  const modulesDirectories = ['foo/bar', 'node_modules']
  const result = validateModulesDirectories(modulesDirectories)
  t.same(result, `Expected only directory names, but found the following paths: ["foo/bar"]`)
})


/**
 * Passes
 */

test(`passes if input array contains only directory names and node_modules`, t => {
  const modulesDirectories = ['foo', 'node_modules']
  const result = validateModulesDirectories(modulesDirectories)
  t.notOk(result)
})
