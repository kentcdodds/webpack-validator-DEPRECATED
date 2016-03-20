import {find} from 'lodash'
export {friendlyTypeOf}
const typesAndInstances = [
  {instance: Date, type: 'date'},
  {instance: RegExp, type: 'regex'},
  {instance: Boolean, type: 'boolean'},
  {instance: Number, type: 'number'},
  {instance: Array, type: 'array'},
]

function friendlyTypeOf(value) {
  if (value === null) {
    return 'null'
  }
  const {type} = find(typesAndInstances, ({instance}) => value instanceof instance) || {}
  return type || typeof value
}

