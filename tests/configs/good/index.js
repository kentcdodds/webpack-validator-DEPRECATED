import glob from 'glob'
import path from 'path'

export default glob.sync(
  path.join(__dirname, './*.js'),
  {ignore: __filename}
).map(filePathToConfigObj)

function filePathToConfigObj(filepath) {
  let config = require(filepath)
  if (config.default) {
    config = config.default
  }
  return {
    config,
    filepath,
    name: path.parse(filepath).name,
  }
}

