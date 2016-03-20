import _ from 'lodash'
import {friendlyTypeOf} from '../../utils'

export default function validateAlias(alias) {
  if (!_.isPlainObject(alias)) {
    return 'Alias should be a plain object'
  }

  if (_.some(Object.values(alias), path => friendlyTypeOf(path) !== 'string')) {
    return `Alias object's values should be strings`
  }
}

