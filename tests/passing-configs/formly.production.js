/* eslint-env node */
const packageJson = {
  name: 'formly',
  version: '0.0.0',
  contributors: [],
}

const here = require('path-here');
const _ = require('lodash');
const webpack = require('webpack');
const deindent = require('deindent');
const WebpackNotifierPlugin = require('webpack-notifier');

export default getConfig();

function getConfig() {
  const config = getCommonConfig();
  return _.merge(config, getProdConfig());
}

function getCommonConfig() {
  return {
    context: here('src'),
    entry: './index.js',
    output: {
      libraryTarget: 'umd',
      library: 'ngFormly'
    },
    stats: {
      colors: true,
      reasons: true
    },
    resolve: {
      extensions: ['', '.js'],
      alias: {
        'angular-fix': here('src/angular-fix')
      }
    },
    eslint: {
      emitError: true,
      failOnError: true,
      failOnWarning: false,
      quiet: true
    },
    externals: {
      angular: 'angular',
      'api-check': {
        root: 'apiCheck',
        amd: 'api-check',
        commonjs2: 'api-check',
        commonjs: 'api-check'
      }
    }
  };
}

function getProdConfig() {
  return {
    output: {
      filename: 'dist/formly.min.js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        getJavaScriptLoader(),
        getHtmlLoader()
      ]
    },
    plugins: _.union(getCommonPlugins(), [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ])
  };
}

function getJavaScriptLoader() {
  return {test: /\.js$/, loaders: ['ng-annotate', 'babel', 'eslint?configFile=./other/src.eslintrc'], exclude: /node_modules/};
}

function getHtmlLoader() {
  return {test: /\.html$/, loaders: ['raw'], exclude: /node_modules/};
}

function getCommonPlugins() {
  return _.filter([
    new webpack.BannerPlugin(getBanner(process.env.NODE_ENV), {raw: true}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      VERSION: JSON.stringify(packageJson.version)
    }),
    process.env.CI ? undefined : new WebpackNotifierPlugin({
      title: 'angular-formly',
      contentImage: here('other/logo/angular-formly-logo-64px.png')
    })
  ]);
}

function getBanner(env) {
  if (env === 'production') {
    return deindent`
      /*! ${packageJson.name} v${packageJson.version} | MIT | built with ♥ by ${packageJson.contributors.join(', ')} (ó ì_í)=óò=(ì_í ò) */
    `.trim();
  } else {
    return deindent`
      /*!
      * ${packageJson.name} JavaScript Library v${packageJson.version}
      *
      * @license MIT (http://license.angular-formly.com)
      *
      * built with ♥ by ${packageJson.contributors.join(', ')}
      * (ó ì_í)=óò=(ì_í ò)
      */
    `.trim();
  }
}
