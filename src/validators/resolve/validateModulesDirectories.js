import path from 'path'
import {friendlyTypeOf} from '../../utils'

function isPath(str) {
  // Simple duck-typing test coming. ;)
  return str.includes(path.sep)
}

export default function validateModulesDirectories(modulesDirectories) {
  const type = friendlyTypeOf(modulesDirectories)

  if (type !== 'array') {
    return `Must be an array`
  }

  if (!modulesDirectories.includes('node_modules')) {
    return {warning: `"node_modules" is missing. This means that modules from \`node_modules\` won't be found'`}
  }

  const paths = modulesDirectories.filter(isPath)
  if (paths.length) {
    return `Expected only directory names, but found the following paths: ${JSON.stringify(paths)}`
  }
}

