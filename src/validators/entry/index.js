import {
  isString, isArray,
  isObject, map,
} from 'lodash'

export default {
  key: 'entry',
  validate: validateEntry,
}

function validateEntry(val, {config}) {
  if (isString(val)) {
    // If a string is passed, we have to assume that the entry is valid,
    // as there are too many ways in which the referred module could be
    // resolved (loader-strings, query-params, resolve.moduleDirectories,
    // resolve.extensions etc.)
    return null
  } else if (isArray(val) || isObject(val)) {
    return map(val, entry => validateEntry(entry, {config}))
      .filter(error => error)
      .join('\n')
  } else {
    return `expected string, array of strings, or an object, but got ${val}.`
  }
}
