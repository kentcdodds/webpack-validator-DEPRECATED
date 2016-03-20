import {noop} from 'lodash'
import validateLoadersEntry from './validateLoadersEntry'

export default [
  {key: 'module.loaders', validate: validateLoadersEntry},
  {key: 'module.preLoaders', validate: validateLoadersEntry},
  {key: 'module.postLoaders', validate: validateLoadersEntry},
  {key: 'module.noParse', validate: noop},
]
