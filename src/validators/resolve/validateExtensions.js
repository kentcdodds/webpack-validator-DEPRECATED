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

  const arrayContainsNonStrings = _.some(extensions, extension => friendlyTypeOf(extension) !== 'string')

  if (arrayContainsNonStrings) {
    return `Array must contain strings only`
  }

  const arrayContainsMalformattedExtensions =
    _.some(extensions, extension => extension !== '' && !extension.startsWith('.'))

  if (arrayContainsMalformattedExtensions) {
    return `Extensions should start with a period, e.g. ".js"`
  }

}

