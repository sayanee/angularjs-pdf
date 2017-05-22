const webpack = require('webpack');
const pkg = require('./package.json');

const banner = `Angular-PDF: ${pkg.description}
@version ${pkg.version}
@link ${pkg.homepage}
@license MIT License, http://www.opensource.org/licenses/MIT`

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProdMin = ENV === 'build-min';
var isProd = ENV === 'build' || isProdMin;
var isExecuting = ENV === 'start';

var config = {
  entry: "./src/angular-pdf.module.js",
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
    rules: [{
      test: /src.*\.js$/,
      loader: 'ng-annotate-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [
          "latest",
        ],
        plugins: isTest ? [
          "istanbul"
        ] : undefined
      }
    }
    ],
  },
  externals: {
    "angular": "angular",
    "pdfjs-dist": "pdfjs-dist"
  }
};

if (isProd) {
  config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin()
  )
  if (isProdMin) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: isProd
      })
    )
  }
}

config.output = isTest ? {} : {
  path: __dirname + '/dist',
  publicPath: isProd ? '/' : 'http://localhost:8080/',
  filename: "angular-pdf" + (isProdMin || isExecuting ? ".min" : "") + ".js",
  library: "pdf",
  libraryTarget: "umd",
  umdNamedDefine: true
};

module.exports = config;
