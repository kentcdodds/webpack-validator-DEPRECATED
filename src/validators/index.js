import {flatten} from 'lodash'

import context from './context'
import entry from './entry'
import output from './output'
import module from './module'
import plugins from './plugins'
import externals from './externals'
import node from './node'
import stats from './stats'
import resolve from './resolve'
import devtool from './devtool'
import debug from './debug'
import devServer from './devServer'
import resolveLoader from './resolveLoader'
import target from './target'
import bail from './bail'
import profile from './profile'
import cache from './cache'
import amd from './amd'
import loader from './loader'
import recordsPath from './recordsPath'
import recordsInputPath from './recordsInputPath'
import recordsOutputPath from './recordsOutputPath'

export default flatten([
  context,
  entry,
  plugins,
  externals,
  output,
  module,
  node,
  stats,
  resolve,
  devtool,
  debug,
  devServer,
  resolveLoader,
  target,
  bail,
  profile,
  cache,
  amd,
  loader,
  recordsPath,
  recordsInputPath,
  recordsOutputPath,
])

