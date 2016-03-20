import _ from 'lodash'
import {friendlyTypeOf} from '../../utils'
import isAbsolute from 'path-is-absolute'

export default function validateRoot(root) {
  const type = friendlyTypeOf(root)

  if (type !== 'string' && type !== 'array') {
    return `Must be a string or array`
  }

  if (type === 'string' && !isAbsolute(root)) {
    return `Must be an absolute path`
  }

  if (type === 'array' && !_.every(root, path => isAbsolute(path))) {
    return `Every element of the array must be an absolute path`
  }
}

