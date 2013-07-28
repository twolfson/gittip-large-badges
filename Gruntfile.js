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
