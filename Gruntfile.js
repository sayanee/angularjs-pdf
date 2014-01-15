module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');

};
