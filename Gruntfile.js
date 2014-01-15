module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    clean: {
      all: ['dist/*.js']
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'example/js/directives',
            src: ['angular-pdf.js'],
            dest: 'dist/'
          }
        ]
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
          compress: true,
          beautify: false
        },
        files: {
          'dist/angular-pdf.min.js': ['dist/angular-pdf.js']
        }
      }

    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'clean',
    'jsonlint',
    'jshint',
    'copy',
    'uglify'
  ]);


};
