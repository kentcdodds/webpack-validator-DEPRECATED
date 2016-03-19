import test from 'ava'
import {friendlyTypeOf} from './index'

const tests = [
  {type: 'array', val: []},
  {type: 'null', val: null},
  {type: 'boolean', val: true},
  {type: 'boolean', val: false},
  {type: 'object', val: {}},
  {type: 'date', val: new Date()},
  {type: 'number', val: 3},
  {type: 'undefined', val: undefined},
  {type: 'regex', val: /wookie/},
]

tests.forEach(({type, val}) => {
  test(`${type}: ${val}`, t => {
    t.same(friendlyTypeOf(val), type)
  })
})

