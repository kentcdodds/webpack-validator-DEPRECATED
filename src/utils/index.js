import path from 'path'
import fs from 'fs'

export {
  fileExists,
}

function fileExists(filepath) {
  try {
    const stats = fs.lstatSync(filepath)
    /* istanbul ignore else because I don't know how to test that... */
    if (stats.isFile()) {
      return true
    } else if (stats.isDirectory()) {
      const indexFilepath = path.join(filepath, 'index.js')
      return fileExists(indexFilepath)
    }
  } catch (e) {
    // ignore error
  }
  return false
}
