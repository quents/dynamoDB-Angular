module.exports = function (grunt) {
"use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('bower-install', 'install bower components', function() {
    var done = this.async();
    var puts = function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if(error)
    console.log('exec error: ' + error);
    done();
    };
    require('child_process').exec('bower install', puts);
  });

  grunt.registerTask('server-run', 'run express server', function() {
    var done = this.async();
    var puts = function(error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if(error) {
        console.log('exec error: ' + error);
      }
      done();
    };
    require('child_process').exec('node index', puts);
  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["ts"]);

  grunt.config.set('ts', {
    ts: {
        src: ["assets/js/**/*.ts", "!node_modules/**/*.ts", "!out/**/*.ts"]
    }
  });

  grunt.config.set('clean', {
    www: [ 'out/public' ]
  });

  grunt.config.set('copy', {
    sources: {
      cwd: 'assets',
      expand: true,
      src: '**',
      dest: 'out/public'
    },
    bower: {
      expand: true,
      src: 'bower.json',
      dest: 'out/public'
    },
    bower_components: {
      cwd: 'bower_components',
      expand: true,
      src: '**',
      dest: 'out/public/bower_components'
    }
  });

  var htmlBuildOptions = {
    logOptions: true,
    relative: true,
    beautify: true,
    prefix: ' ',
    scripts: {
    bundle: [
      'out/public/js/*.js',
      'out/public/js/controllers/*.js',
      'out/public/js/services/*.js',
      'out/public/js/directives/*.js',
      'out/public/js/filters/*.js'
    ]
    },
    styles: {
      bundle: 'out/public/css/*.css'
    }
  };

  grunt.config.set('htmlbuild', {
    index: {
      src: 'assets/index.html',
      dest: 'out/public/index.html',
    options: htmlBuildOptions
    }
  });

   grunt.config.set('wiredep', {
    app: {
      src: 'out/public/index.html',
      cwd: 'out/public'
    }
  });

  grunt.config.set('watch', {
    src: {
    files: [ 'assets/**/**/**' ],
    tasks: [ 'make' ],
    },
    bower: {
    files: [ 'bower_components/**/**/**' ],
    tasks: [ 'make' ]
    }
  });

  grunt.config.set('parallel', {
    mix: {
      options: {
        stream: true
      },
      tasks: [{
        grunt: true,
        args: ['watch']
      }, {
        grunt: true,
        args: ['server-run']
      }]
    }
  });

  grunt.registerTask('make', [
    'clean',
    'copy',
    'htmlbuild',
    'wiredep'
  ]);


   grunt.registerTask('install', [
    'bower-install',
    'ts',
    'make'
  ]);

  grunt.registerTask('default', [
    'ts',
    'make',
    'parallel'
  ]);

};