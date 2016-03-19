import test from 'ava'
import cacheValidator from './index'
import {friendlyTypeOf} from '../../utils'
const {validate} = cacheValidator

const validValues = [true, false, {}]
const invalidValues = [3, [], null, 'hi', /octocat/]

validValues.forEach(val => {
  test(`${typeof val}: ${val}`, t => t.true(validate(val) === undefined))
})

invalidValues.forEach(val => {
  const type = friendlyTypeOf(val)
  test(`${type}: ${val}`, t => {
    t.same(
      validate(val),
      `Unexpected type ${type}. Must be a boolean or an object`
    )
  })
})

