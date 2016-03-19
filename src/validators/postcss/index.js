import {isPlainObject, values, every} from 'lodash'

export default {
  key: 'postcss',
  validate: validateEntry,
}

function validateEntry(val) {
  if (typeof val !== 'function') {
    return {warning: 'The documented way of specifying postcss options is supplying a function'}
  } else {
    const options = val()
    if (!Array.isArray(options) && !(isPlainObject(options) && every(values(options), Array.isArray))) {
      return {
        warning: 'The postcss function is expected to return an array ' +
                 'of plugins or an object whose values are arrays of plugins',
      }
    }
  }
}
