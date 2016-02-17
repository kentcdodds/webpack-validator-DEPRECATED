/* eslint no-console:0 */
import test from 'ava'
import sinon from 'sinon'
import passingConfigs from './passing-configs'
import webpackValidator from '../'

let originalConsoleLog

passingConfigs.forEach(({name, config}) => {
  test(`no warnings for ${name}`, () => {
    setup()
    webpackValidator(config)
    if (console.log.called) {
      const consoleLogOutput = console.log.args.join('\n')
      const indentedOutput = consoleLogOutput.replace(/\n/g, '\n\t')
      throw new Error([
        '**** console.log was called with:',
        `\t${indentedOutput}`,
        '\n****',
      ].join('\n'))
    }
    cleanup()
  })
})

function setup() {
  originalConsoleLog = console.log
  console.log = sinon.spy()
}

function cleanup() {
  console.log = originalConsoleLog
}

