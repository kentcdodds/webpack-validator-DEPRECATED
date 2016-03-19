import test from 'ava'
import {friendlyTypeOf} from '../../utils'

import targetValidator from './index'
const {validate} = targetValidator

const validValues = [
  'web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron',
]
const validValuesList = validValues.join(', ')

const invalidValues = [
  'veb', 'something else',
]

const invalidValueTypes = [
  true, 43, undefined, {},
]

validValues.forEach(val => {
  test(val, t => t.true(validate(val) === undefined))
})

invalidValues.forEach(val => {
  test(val, t => {
    t.same(
      validate(val),
      `Unexpected option ${val}. Must be one of: ${validValuesList}`
    )
  })
})

invalidValueTypes.forEach(val => {
  const type = friendlyTypeOf(val)
  test(type, t => {
    t.same(
      validate(val),
      `Unexpected type ${type}. Must be a string of one of: ${validValuesList}`
    )
  })
})

