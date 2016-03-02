import {noop} from 'lodash'
export default [
  {key: 'stats.colors', validate: noop},
  {key: 'stats.reasons', validate: noop},
  {key: 'stats', validate: noop}, // cover everything else. Find where this object is documented in webpack
]

