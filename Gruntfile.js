module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    bump: {
      options: {
        files: [
          'package.json',
          'bower.json',
          'readme.md',
          'example/js/angularjs-pdf/angular-pdf.js',
          'example/js/angularjs-pdf/angular-pdf-delegate.js',
          'dist/angular-pdf.js',
          'dist/angular-pdf.min.js'
        ],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: [
          'package.json',
          'bower.json',
          'readme.md',
          'example/js/angularjs-pdf/angular-pdf.js',
          'example/js/angularjs-pdf/angular-pdf.js',
          'dist/angular-pdf.js',
          'dist/angular-pdf.min.js'
        ],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1'
      }
    },

    clean: {
      all: ['dist/*.js']
    },

    jshint: {
      all: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'Gruntfile.js',
          'example/js/*.js'
        ]
      }
    },

    jsonlint: {
      all: {
        src: [
          'bower.json',
          'package.json',
          '.jscs.json',
          '.jshintrc'
        ]
      }
    },

    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: [
          'example/js/angularjs-pdf/angular-pdf.js',
          'example/js/angularjs-pdf/angular-pdf-delegate.js'
        ],
        dest: 'dist/angular-pdf.js'
      }
    },

    uglify: {
      production: {
        options: {
          mangle: false,
          compress: true,
          beautify: false,
          preserveComments: 'all'
        },
        files: {
          'dist/angular-pdf.min.js': ['dist/angular-pdf.js']
        }
      }

    }

  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', [
    'clean',
    'jsonlint',
    'jshint',
    'concat',
    'uglify'
  ]);


};
