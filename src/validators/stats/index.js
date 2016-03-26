import {sortBy, difference, includes} from 'lodash'
import {friendlyTypeOf} from '../../utils'
import {validateReducer} from 'configuration-validator'

const {EXIT_EARLY, CONTINUE} = validateReducer

const validProperties = getValidProperties()
const validKeys = validProperties.map(({key}) => key)
const validStringValues = sortBy([
  'none', 'errors-only', 'minimal', 'normal', 'verbose',
])
const validDataTypes = ['object', 'string', 'boolean']
const validKeysJoined = validKeys.join(', ')
const validStringValuesJoined = validStringValues.join(', ')
const validDataTypesJoined = validDataTypes.join(', ')
const validators = [validateDataType, validateAsString, validateAsObject]

export default {key: 'stats', validate: validateStats}

// exported for testing
export {validKeysJoined, validStringValuesJoined, validDataTypesJoined, validateStats}


function validateStats(val) {
  return validateReducer(validators, val)
}

function validateDataType(val) {
  const type = friendlyTypeOf(val)
  const isCorrectType = includes(validDataTypes, type)
  if (!isCorrectType) {
    return `Unexpected type: ${type}. Valid types are: ${validDataTypesJoined}`
  } else {
    return CONTINUE
  }
}

function validateAsString(val) {
  if (friendlyTypeOf(val) !== 'string') {
    return CONTINUE
  }

  const isCorrectStringValue = includes(validStringValues, val)
  if (isCorrectStringValue) {
    return EXIT_EARLY
  }
  return `Unexpected string value: ${val}. Valid string values are: ${validStringValuesJoined}`
}

function validateAsObject(val) {
  if (friendlyTypeOf(val) !== 'object') {
    return CONTINUE
  }

  const propertiesValidated = validateProperties(val)
  if (propertiesValidated !== CONTINUE) {
    return propertiesValidated
  }

  const typesValidated = validatePropertyTypes(val)
  if (typesValidated !== CONTINUE) {
    return typesValidated
  }

  return CONTINUE
}

function validateProperties(val) {
  const diff = difference(Object.keys(val), validKeys)
  if (diff.length) {
    const properties = diff.length === 1 ? 'property' : 'properties'
    const diffJoined = diff.join(', ')
    return `Unexpected ${properties}: ${diffJoined}. Valid properties are: ${validKeysJoined}`
  } else {
    return CONTINUE
  }
}

function validatePropertyTypes(val) {
  const invalidPropertyValues = validProperties.reduce(addInvalidProperties, [])
  if (invalidPropertyValues.length) {
    const types = invalidPropertyValues.length === 1 ? 'type' : 'types'
    return `Unexpected property ${types}. ${invalidPropertyValues.join(' - ')}`
  } else {
    return CONTINUE
  }

  function addInvalidProperties(messages, {key, type}) {
    if (val[key]) {
      const valType = friendlyTypeOf(val[key])
      if (valType !== type) {
        messages.push(`Property \`${key}\` should be \`${type}\``)
      }
    }
    return messages
  }
}

function getValidProperties() {
  // available keys aren't really documented as far as I know,
  // but I got these by looking at the source:
  // https://github.com/webpack/webpack/blob/9f440e30ecac00bfc27b91d372a969d3414d194c/lib/Stats.js
  return sortBy([
    {key: 'context', type: 'string'},
    {key: 'hash', type: 'boolean'},
    {key: 'version', type: 'boolean'},
    {key: 'timings', type: 'boolean'},
    {key: 'assets', type: 'boolean'},
    {key: 'chunks', type: 'boolean'},
    {key: 'modules', type: 'boolean'},
    {key: 'reasons', type: 'boolean'},
    {key: 'children', type: 'boolean'},
    {key: 'source', type: 'boolean'},
    {key: 'errorDetails', type: 'boolean'},
    {key: 'errors', type: 'boolean'},
    {key: 'warnings', type: 'boolean'},
    {key: 'publicPath', type: 'boolean'},
    {key: 'chunkModules', type: 'boolean'},
    {key: 'colors', type: 'boolean'},
    {key: 'chunkOrigins', type: 'boolean'},
    {key: 'cached', type: 'boolean'},
    {key: 'cachedAssets', type: 'boolean'},
    {key: 'modulesSort', type: 'boolean'},
    {key: 'chunksSort', type: 'boolean'},
    {key: 'assetsSort', type: 'boolean'},
  ], 'key')
}
