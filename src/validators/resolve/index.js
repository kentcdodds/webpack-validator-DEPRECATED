import {noop} from 'lodash'
import validateAlias from './validateAlias'
import validateRoot from './validateRoot'

export default [
  {key: 'resolve.alias', validate: validateAlias},
  {key: 'resolve.root', validate: validateRoot},
  {key: 'resolve.modulesDirectories', validate: noop},
  {key: 'resolve.fallback', validate: noop},
  {key: 'resolve.extensions', validate: noop},
  {key: 'resolve.packageMains', validate: noop},
  {key: 'resolve.packageAlias', validate: noop},
  {key: 'resolve.unsafeCache', validate: noop},
]

