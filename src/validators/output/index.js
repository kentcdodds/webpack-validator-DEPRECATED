import {noop} from 'lodash'
import isAbsolute from 'path-is-absolute'

export default [
  {key: 'output.filename', validate: validateOutputFileName},
  {key: 'output.path', validate: validateOutputPath},
  {key: 'output.publicPath', validate: noop},
  {key: 'output.chunkFilename', validate: noop},
  {key: 'output.sourceMapFilename', validate: noop},
  {key: 'output.devtoolModuleFilenameTemplate', validate: noop},
  {key: 'output.devtoolFallbackModuleFilenameTemplate', validate: noop},
  {key: 'output.devtoolLineToLine', validate: noop},
  {key: 'output.hotUpdateChunkFilename', validate: noop},
  {key: 'output.hotUpdateMainFilename', validate: noop},
  {key: 'output.jsonpFunction', validate: noop},
  {key: 'output.hotUpdateFunction', validate: noop},
  {key: 'output.pathinfo', validate: noop},
  {key: 'output.library', validate: noop},
  {key: 'output.libraryTarget', validate: noop},
  {key: 'output.umdNamedDefine', validate: noop},
  {key: 'output.sourcePrefix', validate: noop},
  {key: 'output.crossOriginLoading', validate: noop},
]

export function validateOutputFileName(value) {
  let absolute
  try {
    absolute = isAbsolute(value)
  } catch (e) {
    // ignore
  }
  if (absolute) {
    return 'Must not be an absolute path'
  }
}

export function validateOutputPath(value) {
  let absolute
  try {
    absolute = isAbsolute(value)
  } catch (e) {
    // ignore
  }
  if (!absolute) {
    return 'Must be an absolute path'
  }
}


