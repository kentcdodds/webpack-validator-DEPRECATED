import isAbsolute from 'path-is-absolute'
export default {
  key: 'context',
  validate: validateContext,
}

function validateContext(val) {
  let absolute
  try {
    absolute = isAbsolute(val)
  } catch (e) {
    // ignore
  }
  if (!absolute) {
    return 'Must be an absolute path'
  }
}

