import test from 'ava'

import validateEntry from './index'
const {validate} = validateEntry

test('eval', t => {
  t.notOk(validate('eval', {config: {}}))
})

test('source-map', t => {
  t.notOk(validate('source-map', {config: {}}))
})

test('hidden-source-map', t => {
  t.notOk(validate('hidden-source-map', {config: {}}))
})

test('inline-source-map', t => {
  t.notOk(validate('inline-source-map', {config: {}}))
})

test('eval-source-map', t => {
  t.notOk(validate('eval-source-map', {config: {}}))
})

test('cheap-source-map', t => {
  t.notOk(validate('cheap-source-map', {config: {}}))
})

test('cheap-module-source-map', t => {
  t.notOk(validate('cheap-module-source-map', {config: {}}))
})

test('cheap-eval-source-map', t => {
  t.notOk(validate('cheap-eval-source-map', {config: {}}))
})

// pragmas

test('# pragma', t => {
  t.notOk(validate('#cheap-eval-source-map', {config: {}}))
})

test('#@ pragma', t => {
  t.notOk(validate('#@cheap-eval-source-map', {config: {}}))
})

test('@ pragma', t => {
  t.notOk(validate('@cheap-eval-source-map', {config: {}}))
})

// fails

test('bad @@ pragma', t => {
  t.ok(validate('@@eval', {config: {}}) === 'Unexpected devtool option @@eval')
})

test('bad devtool type pla', t => {
  t.ok(validate('pla pla pla', {config: {}}) === 'Unexpected devtool option pla pla pla')
})

test('bad devtool type eval', t => {
  t.ok(validate('evla-elkajslksd', {config: {}}) === 'Unexpected devtool option evla-elkajslksd')
})
