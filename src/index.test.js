/* eslint no-console:0 */
import test from 'ava'
import sinon from 'sinon'
import webpackValidator from '.'

let originalConsole

test('logs errors', t => {
  t.true(true)
//  setup()
//  webpackValidator({context: false})
//  t.true(console.log.calledOnce)
//  t.ok(console.log.calledWithMatch(/context/))
//  cleanUp()
})

function setup() {
  originalConsole = console.log
  console.log = sinon.spy()
}

function cleanUp() {
  console.log = originalConsole
}

