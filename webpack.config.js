var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactDomExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};

var rxExternal = {
  root: 'Rx',
  commonjs2: 'rx',
  commonjs: 'rx',
  amd: 'rx'
};

module.exports = {
    output: {
        library: 'ReactLazyLoadHandler',
        libraryTarget: 'umd'
    },
    externals: {
        'react': reactExternal,
        'react-dom': reactDomExternal,
        'rx': rxExternal
    },
    module: {
        loaders: [
            {test: /\.jsx?/i, exclude: /node_modules/, loader: 'babel'}
        ]
    }
}