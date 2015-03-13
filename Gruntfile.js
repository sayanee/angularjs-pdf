module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    bump: {
      options: {
        files: [
          'package.json',
          'bower.json',
          'readme.md',
          'example/js/directives/angular-pdf.js',
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
          'example/js/directives/angular-pdf.js',
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
      all: [
        'dist/*.js',
        'example/js/lib/*.js'
      ]
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'example/js/directives',
            src: [ 'angular-pdf.js' ],
            dest: 'dist/'
          },
          {
            cwd: 'bower_components/pdfjs-dist/build',
            src: [ 'pdf.js', 'pdf.worker.js' ],
            dest: 'example/js/lib',
            flatten: true,
            expand: true
          },
          {
            cwd: 'bower_components/angular',
            src: [ 'angular.min.js', 'angular.min.js.map' ],
            dest: 'example/js/lib',
            flatten: true,
            expand: true
          }
        ]
      }
    },

    jscs: {
      src: [
        'Gruntfile.js',
        'example/js/directives/angular-pdf.js'
      ],
      options: {
        config: '.jscsrc'
      }
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

    uglify: {
      production: {
        options: {
          mangle: false,
          compress: {},
          beautify: false,
          preserveComments: 'all'
        },
        files: {
          'dist/angular-pdf.min.js': [ 'dist/angular-pdf.js' ]
        }
      }

    }

  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'clean',
    'jsonlint',
    'jscs',
    'jshint',
    'copy',
    'uglify'
  ]);

  grunt.registerTask('check', [
    'jsonlint',
    'jscs',
    'jshint'
  ]);

};
