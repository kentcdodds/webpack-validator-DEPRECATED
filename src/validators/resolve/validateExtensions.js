import _ from 'lodash'
import {friendlyTypeOf} from '../../utils'

export default function validateExtensions(extensions) {
  const type = friendlyTypeOf(extensions)

  if (type !== 'array') {
    return `Must be an array`
  }

  if (!extensions.includes('')) {
    return `The extensions array should contain "", ` +
       `so that modules that were required with their extension are properly resolved`
  }

  if (_.some(extensions, extension => friendlyTypeOf(extension) !== 'string')) {
    return `Array must contain strings only`
  }

  if (_.some(extensions, extension => extension !== '' && !extension.startsWith('.'))) {
    return `Extensions should start with a period, e.g. ".js"`
  }

}

