import path from 'path'
import {
  isString, isArray,
  isObject, map,
} from 'lodash'
import {fileExists} from '../../utils'

export default {
  key: 'entry',
  validate: validateEntry,
}

function validateEntry(val, {config}) {
  const context = config.context || process.cwd()
  if (isString(val)) {
    return getEntryError(context, val)
  } else if (isArray(val)) {
    return map(val, entry => getEntryError(context, entry))
      .filter(error => error)
      .join(' - ')
  } else if (isObject(val)) {
    return map(val, entryVal => validateEntry(entryVal, {config}))
      .filter(error => error)
      .join(' - ')
  } else {
    return 'must be a string, array of strings, or an object'
  }
}

function getEntryError(context, entry) {
  const entryPath = path.resolve(context, entry)
  const entryExists = fileExists(entryPath)
  if (!entryExists) {
    return `no file exists at ${entryPath}`
  }
}
