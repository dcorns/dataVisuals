/**
 * Created by dcorns on 12/15/14.
 */
'use strict';
module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dev: {
        src: ['build/']
      },
      production: {
        src: ['ship/']
      },
      style:{
        src: ['build/css/']
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'css/*.css', 'img/*.*', 'views/**/*.html'],
        dest: 'build/',
        filter: 'isFile'
      },
      production: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'css/*.css', 'img/*.*', 'views/**/*.html'],
        dest: 'ship/',
        filter: 'isFile'
      },
      style:{
        expand: true,
        cwd: 'app/',
        src: ['css/*.css'],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },

      production: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['app/js/**/*.js'],
        dest: 'ship/bundle.js'
      }
    },
    simplemocha: {
      all: {
        src: ['test/api/**/*.js']
      }
    },
    watch: {
      express: {
        files: ['app/js/**/*.js', 'app/index.html', 'app/views/**/*.html', 'server.js', 'models/*.js', 'routes/*.js'],
        tasks: ['buildtest', 'express:dev'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.registerTask('build:dev', ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('build:production', ['clean:production', 'browserify:production', 'copy:production']);
  grunt.registerTask('angulartest', ['browserify:angulartest', 'karma:unit']);
  grunt.registerTask('angulartestwatch', ['angulartest', 'watch:angulartest']);
  grunt.registerTask('test', ['angulartest', 'simplemocha']);
  grunt.registerTask('buildtest', ['test', 'build:dev']);
  grunt.registerTask('default', ['watch:express']);
  grunt.registerTask('copystyle',['clean:style', 'copy:style']);
  grunt.registerTask('apitest', 'simplemocha');
};