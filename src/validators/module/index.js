import {noop} from 'lodash'
import validateLoaders from './validateLoaders'

export default [
  {key: 'module.loaders', validate: validateLoaders},
  {key: 'module.preLoaders', validate: validateLoaders},
  {key: 'module.postLoaders', validate: validateLoaders},
  {key: 'module.noParse', validate: noop},
]
