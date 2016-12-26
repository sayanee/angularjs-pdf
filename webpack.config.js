const webpack = require('webpack');
const pkg = require('./package.json');

const banner = `Angular-PDF: ${pkg.description}
@version ${pkg.version}
@link ${pkg.homepage}
@license MIT License, http://www.opensource.org/licenses/MIT`

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

var config = {
  entry: "./src/angular-pdf.js",
  devtool: (isProd) ? 'source-map' : 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.BannerPlugin(banner),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: './example',
    inline: true,
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jscs-loader'
    }, {
      test: /\.js$/,
      loader: "eslint-loader",
      exclude: /node_modules/
    }],
    loaders: [{
        test: /src.*\.js$/,
        loader: 'ng-annotate'
      }, {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: [
            "latest",
          ],
        }
      }
    ],
  },
  jscs: {
    validateIndentation: 2,
    emitErrors: true,
    failOnHint: true,
  },
  eslint: {
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module"
    },
    emitError: true,
    failOnError: true,
  },
  externals: {
    "angular": "angular",
    "pdfjs-dist": "pdfjs-dist"
  }
};

if (isProd) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  )
}

config.output = isTest ? {} : {
  path: __dirname + '/dist',
  publicPath: isProd ? '/' : 'http://localhost:8080/',
  filename: "angular-pdf.min.js",
  library: "pdf",
  libraryTarger: "umd",
  umdNamedDefine: true
};

module.exports = config;
