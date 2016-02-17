import validators from './validators'
import flatten from 'lodash.flatten'
import {configValidator} from 'configuration-validator'

export default webpackValidator

function webpackValidator(config, ...otherValidators) {
  const instanceValidators = flatten([...validators, ...otherValidators])
  configValidator('Webpack Config', config, instanceValidators)
  return config
}

