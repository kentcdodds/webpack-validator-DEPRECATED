import {isBoolean} from 'lodash'
export default {
  key: 'debug',
  validate: validateDebug,
}

function validateDebug(val) {
  if (!isBoolean(val)) {
    return 'No boolean value provided'
  }
}

