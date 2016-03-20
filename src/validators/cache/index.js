import {friendlyTypeOf} from '../../utils'

export default {
  key: 'cache',
  validate: validateCache,
}

function validateCache(value) {
  const type = friendlyTypeOf(value)
  if (type !== 'boolean' && type !== 'object') {
    return `Unexpected type ${type}. Must be a boolean or an object`
  }
}

