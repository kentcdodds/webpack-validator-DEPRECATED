import validators from './validators'
import flatten from 'lodash.flatten'
import {configValidator} from 'configuration-validator'

module.exports = webpackValidator
module.exports.validators = validators

function webpackValidator(config, ...otherValidators) {
  const instanceValidators = flatten([...validators, ...otherValidators])
  configValidator('Webpack Config', config, instanceValidators)
  return config
}

