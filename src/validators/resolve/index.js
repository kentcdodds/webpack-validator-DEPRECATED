import {noop} from 'lodash'
import validateAlias from './validateAlias'
import validateRoot from './validateRoot'
import validateModulesDirectories from './validateModulesDirectories'

export default [
  {key: 'resolve.alias', validate: validateAlias},
  {key: 'resolve.root', validate: validateRoot},
  {key: 'resolve.modulesDirectories', validate: validateModulesDirectories},
  {key: 'resolve.fallback', validate: validateRoot},
  {key: 'resolve.extensions', validate: noop},
  {key: 'resolve.packageMains', validate: noop},
  {key: 'resolve.packageAlias', validate: noop},
  {key: 'resolve.unsafeCache', validate: noop},
]

