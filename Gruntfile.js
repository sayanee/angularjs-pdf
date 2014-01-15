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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
