import {noop} from 'lodash'
export default [
  {key: 'node.console', validate: noop},
  {key: 'node.global', validate: noop},
  {key: 'node.process', validate: noop},
  {key: 'node.Buffer', validate: noop},
  {key: 'node.__filename', validate: noop},
  {key: 'node.__dirname', validate: noop},
  {key: 'node', validate: noop}, // in the webpack docs it says <node buildin> and I'm not sure what that means
]

