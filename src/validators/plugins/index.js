import {friendlyTypeOf} from '../../utils'
import _ from 'lodash'

export default {
  key: 'plugins',
  validate: validatePlugins,
}

function validatePlugins(plugins) {
  if (friendlyTypeOf(plugins) !== 'array') {
    return 'Should be an array'
  }

  const arrayContainsANonePlugin = _.some(plugins, plugin => !isPlugin(plugin))

  if (arrayContainsANonePlugin) {
    return 'Should be an array of webpack plugins'
  }
}

// Is there a more comprehensive way to check for plugin-ness?
// https://webpack.github.io/docs/plugins.html tells us that
// plugins can either be a function which has prototype.apply defined,
// or a function that returns an object with apply property
export function isPlugin(plugin) {
  return !!plugin.apply || friendlyTypeOf(plugin) === 'function'
}
