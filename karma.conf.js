// Karma configuration
// Generated on Tue Dec 15 2015 22:21:55 GMT+0100 (CET)
var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'example/pdf/relativity.pdf', included: false, served: true},
      {pattern: 'example/pdf/relativity.protected.pdf', included: false, served: true},
      { watched: false, included: true, nocache: true, pattern: 'node_modules/angular/angular.js'},
      { watched: false, included: true, nocache: true, pattern: 'node_modules/pdfjs-dist/build/pdf.worker.js'},
      { watched: false, included: true, nocache: true, pattern: 'node_modules/pdfjs-dist/build/pdf.js'},
      'example/js/app.js',
      'src/angular-pdf.module.js',
      'example/js/controllers/docCtrl.js',
      'example/partials/*.html',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/spec/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/angular-pdf.module.js': ['webpack', 'sourcemap'],
        'example/partials/*.html': ['ng-html2js'],
    },

    proxies: {
      '/pdf': '/base/example/pdf'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'example/',
      moduleName: 'my.templates'
    },
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: '.' },
        { type: 'text' },
        { type:'lcovonly', subdir: '.'},
        { type:'json', subdir: '.' },
      ],
      dir : 'coverage/'
    },
    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  })
}
