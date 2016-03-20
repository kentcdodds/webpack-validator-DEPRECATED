import {friendlyTypeOf} from '../../utils'
import {SEPERATOR} from '../../constants'
import validateLoader from './validateLoader'


//  loaders: an array of loaders
export default function validateLoadersEntry(loaders) {
  if (friendlyTypeOf(loaders) !== 'array') {
    return `Expected an array of loader objects, but got ${loaders}`
  }

  // Filter out falsy values (= valid cases)
  const messages = loaders.map(validateLoader).filter(message => message)
  return messages.join(SEPERATOR)
}


