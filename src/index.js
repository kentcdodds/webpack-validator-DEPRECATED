import validators from './validators'
import {flatten} from 'lodash'
import configValidator from 'configuration-validator'

// mixing CommonJS in here to make it easier to consume in CommonJS & ES6
module.exports = webpackValidator
module.exports.validators = validators

function webpackValidator(config, ...otherValidators) {
  const instanceValidators = flatten([...validators, ...otherValidators])
  configValidator('Webpack Config', config, instanceValidators)
  return config
}

