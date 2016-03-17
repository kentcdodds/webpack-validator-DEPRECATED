const options = {
  eval: true,
  'cheap-eval-source-map': true,
  'cheap-source-map': true,
  'cheap-module-eval-source-map': true,
  'cheap-module-source-map': true,
  'eval-source-map': true,
  'source-map': true,
  'hidden-source-map': true,
  'inline-source-map': true,
}
const pragmas = new RegExp('^(#@|@|#)')

export default {
  key: 'devtool',
  validate: validateEntry,
}

function validateEntry(val) {
  const pragmaLess = val.replace(pragmas, '')
  if (!options[pragmaLess]) {
    return `Unexpected devtool option ${val}`
  }
}


