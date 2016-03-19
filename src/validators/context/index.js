import {isAbsolute} from 'path'
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

