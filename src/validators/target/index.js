import {friendlyTypeOf} from '../../utils'

const validValues = [
  'web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron',
]
const validValuesList = validValues.join(', ')

export default {
  key: 'target',
  validate: validateTarget,
}

function validateTarget(value) {
  const type = friendlyTypeOf(value)
  if (type !== 'string') {
    return `Unexpected type ${type}. Must be a string of one of: ${validValuesList}`
  }
  const isValid = validValues.indexOf(value) !== -1
  if (!isValid) {
    return `Unexpected option ${value}. Must be one of: ${validValuesList}`
  }
}
