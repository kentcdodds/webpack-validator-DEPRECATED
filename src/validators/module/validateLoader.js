import {SEPERATOR} from '../../constants'
import {friendlyTypeOf} from '../../utils'
import _ from 'lodash'

/**
 *  A loader is an object which can have the following props:
 *  (from https://webpack.github.io/docs/configuration.html#module-loaders)
 *
 *   test: A condition that must be met
 *   exclude: A condition that must not be met
 *   include: A condition that must be met
 *   loader: A string of “!” separated loaders
 *   loaders: An array of loaders as string
 *
 *   A condition may be a RegExp (tested against absolute path),
 *   a string containing the absolute path,
 *   a function(absPath): bool, or an array of one of these combined with “and”.
 */

export function formatErrorMessage(loader, messages) {
  return `While looking at loader ${JSON.stringify(loader)}, ` +
         `the following errors were found: ${messages.join(SEPERATOR)}`
}

// Splitting up this function into more granular parts would
// increase cognitive load even more, so disabling cyclomatic complexity check here.
/* eslint-disable complexity */
function validateLoaderAndLoadersProperty({loader, loaders, query}) {
  const messages = []

  if (!loader && !loaders) {
    messages.push(`Found neither \`loader\` nor \`loaders\``)
  }

  if (loader && loaders) {
    messages.push(`Found \`loader\` and \`loaders\`. These properties are mutually exclusive`)
  }

  if (loaders && query) {
    messages.push(`You can only pass the \`query\` property when you have one \`loader\``)
  }

  if (loader && friendlyTypeOf(loader) !== 'string') {
    messages.push(`Expected \`loader\` property to be a string, but got ${JSON.stringify(loader)}`)
  }

  if (loaders && friendlyTypeOf(loaders) !== 'array') {
    messages.push(`Expected \`loaders\` property to be an array, but got ${JSON.stringify(loaders)}`)
  }

  if (loaders && _.some(loaders, loader_ => friendlyTypeOf(loader_) !== 'string')) {
    messages.push(`Expected \`loaders\` property to be an array of strings, but got ${JSON.stringify(loaders)}`)
  }

  return messages
}
/* eslint-enable complexity */

function isStringOrRegexOrFn(condition) {
  const type = friendlyTypeOf(condition)
  return (type === 'string' || type === 'regex' || type === 'function')
}

function isValidCondition(condition) {
  return isStringOrRegexOrFn(condition) ||
    (friendlyTypeOf(condition) === 'array' && _.every(condition, isStringOrRegexOrFn))
}

function validateCondition(loader, property) {
  if (loader[property] && !isValidCondition(loader[property])) {
    return `Expected \`${property}\` property to be a valid condition, but got ${JSON.stringify(loader[property])}`
  }
}

function validateConditionProperties(loader) {
  return ['test', 'include', 'exclude']
    .map((property) => validateCondition(loader, property))
    .filter(message => message) // Filter out undefined (when no error was emitted)
}

export default function validateLoader(loader) {
  const messages = []
  if (!loader.test) {
    messages.push(`Missing property \`test\` in loader ${JSON.stringify(loader)}`)
  } else {
    messages.push(...validateConditionProperties(loader))
    messages.push(...validateLoaderAndLoadersProperty(loader))
  }

  if (messages.length) {
    return formatErrorMessage(loader, messages)
  }
}
