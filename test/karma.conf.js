// Karma configuration
// Generated on Tue Dec 15 2015 22:21:55 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'example/pdf/relativity.pdf', included: false, served: true},
      'bower_components/pdfjs-dist/web/compatibility.js',
      'example/js/lib/pdf.js',
      'example/js/lib/pdf.worker.js',
      'example/js/lib/angular.min.js',
      'example/js/app.js',
      'example/js/controllers/docCtrl.js',
      'dist/angular-pdf.min.js',
      'example/partials/*.html',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/spec/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'example/partials/*.html': ['ng-html2js']
    },

    proxies: {
      '/pdf': '/base/example/pdf'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'example/',
      moduleName: 'my.templates'
    }
  })
}
