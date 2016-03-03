import {noop} from 'lodash'
export default [
  {key: 'devServer.contentBase', validate: noop},
  {key: 'devServer.hot', validate: noop},
  {key: 'devServer.historyApiFallback', validate: noop},
  {key: 'devServer.proxy', validate: noop},
  {key: 'devServer.quiet', validate: noop},
  {key: 'devServer.noInfo', validate: noop},
  {key: 'devServer.lazy', validate: noop},
  {key: 'devServer.filename', validate: noop},
  {key: 'devServer.watchOptions.aggregateTimeout', validate: noop},
  {key: 'devServer.watchOptions.poll', validate: noop},
  {key: 'devServer.publicPath', validate: noop},
  {key: 'devServer.headers', validate: noop},
  {key: 'devServer.host', validate: noop},
  {key: 'devServer.port', validate: noop},
  
  // we could probably share logic between here and the root `stats` property
  {key: 'devServer.stats', validate: noop},
]

