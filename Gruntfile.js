module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.initConfig({
    watch: {
      options: {
        livereload:true,
        spawn: false
      },
      html: {
        files: "views/**/*.html",
        tasks: []
      },
      css: {
        files: "public/css/**/*.css",
        tasks: []
      },
      less: {
        files: "src/less/**/*.less",
        tasks: ["less", "autoprefixer"]
      },
      js: {
        files: ["src/js/**/*.js", "public/js/**/*.js"],
        tasks: ["concat", "uglify"]
      }
    },
    less: {
      dev: {
        files: {
          "src/css/style.css" : "src/less/style.less"
        }
      }
    },
    autoprefixer: {
      dev: {
        flatten: true,
        expand: true,
        src: "src/css/style.css",
        dest: "public/css"
      }
    },
    uglify: {
      dev: {
        files: {
          "public/js/site.js" : "src/js/combined.js"
        }
      }
    },
    concat: {
      js : {
            src : [
                'src/js/*'
            ],
            dest : 'src/js/combined.js'
        }
    },
    nodemon: {
      dev: {
        script: "index.js"
      }
    },
    concurrent: {
      dev: {
        tasks: ["nodemon", "watch"],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask("default", ["autoprefixer", "concat", "uglify", "concurrent"]);
};
