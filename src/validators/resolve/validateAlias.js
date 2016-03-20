import _ from 'lodash'
import {friendlyTypeOf} from '../../utils'

export default function validateAlias(alias) {
  if (!_.isPlainObject(alias)) {
    return 'Should be a plain object'
  }

  if (_.some(Object.values(alias), path => friendlyTypeOf(path) !== 'string')) {
    return `The object's values should be strings`
  }
}

