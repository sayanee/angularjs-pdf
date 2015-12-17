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
        'example/js/directives/angular-pdf.js',
        'example/js/lib/*.js',
        'dist/angular-pdf.min.js'
      ]
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: [ 'angular-pdf.js' ],
            dest: 'example/js/directives/'
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
        'dist/angular-pdf.js'
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
          'dist/angular-pdf.js'
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
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
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
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [
    'clean',
    'jsonlint',
    'jscs',
    'jshint',
    'copy',
    'uglify',
    'karma'
  ]);

  grunt.registerTask('check', [
    'jsonlint',
    'jscs',
    'jshint',
    'karma'
  ]);
};
