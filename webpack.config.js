const isDev = process.env.NODE_ENV !== 'production'
import webpack from 'webpack'
import ExtractText from 'extract-text-webpack-plugin'

const conf = {
  cssLocalIdentName: '[name]-[local]-[hash:base64:5]',
  publicPath: '//localhost:3001/',
}

module.exports = {
  ...conf,
  entry: {
    'owl-ui': isDev
      ? ['./src/demo', `webpack-hot-middleware/client?path=${conf.publicPath}__webpack_hmr`]
      : ['./src/components'],
  },
  output: {
    path: `${__dirname}/static`,
    filename: '[name].js',
    library: '',
    libraryTarget: 'umd',
    publicPath: conf.publicPath
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: isDev ? ['react-hmre'] : []
        }
      },
      {
        test: /\.md$/,
        loader: 'html!markdown-highlight',
      },
      {
        test: /\.styl$/,
//        loader: ExtractText.extract('style', [
//          `css?sourceMap&modules&localIdentName=${conf.cssLocalIdentName}`,
//          'stylus'
//        ])
        loaders: [
          'style',
          `css?sourceMap&modules&localIdentName=${conf.cssLocalIdentName}`,
          'stylus'
        ]
      }
    ]
  },

  stylus: {
//    import: `${__dirname}/aa`,
  },

  resolve: {
    alias: {
      'react': 'react/dist/react.js',
      'react-dom': 'react-dom/dist/react-dom.js',
    },
  },
  plugins: isDev
    ?
      [
        new ExtractText('owl-ui.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ]
    :
      [

      ],
  watch: isDev ,
  devtool: isDev ? 'inline' : '',
  externals: isDev ? {} : {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    }
  }
}
