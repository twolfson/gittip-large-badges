module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,

        strict: false,
        globals: {
          exports: true,
          describe: true,
          before: true,
          it: true
        }
      }
    },
    curl: {
      'canvas-query': {
        src: 'http://canvasquery.com/canvasquery.js',
        dest: 'lib/render/vendor/canvasquery.js'
      },
      'lato-300': {
        src: 'http://themes.googleusercontent.com/static/fonts/lato/v6/KT3KS9Aol4WfR6Vas8kNcg.woff',
        dest: 'lib/render/vendor/lato-300.woff'
      },
      'lato-900': {
        src: 'http://themes.googleusercontent.com/static/fonts/lato/v6/BVtM30trf7q_jfqYeHfjtA.woff',
        dest: 'lib/render/vendor/lato-900.woff'
      }
    },
    watch: {
      'default': {
        files: '<%= jshint.files %>',
        tasks: ['default']
      }
    }
  });

  // Load in grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-curl');

  // Default task.
  grunt.registerTask('default', ['jshint']);

};
