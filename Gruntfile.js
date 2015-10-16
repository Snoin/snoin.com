var src = 'static_src/';
var web = 'snoin/web/';
var dist = web + 'static/';
var css = {};
css[dist + 'css/<%= pkg.name %>.css'] = dist + 'less/<%= pkg.name %>.less';
var css_min = {};
css_min[dist + 'css/<%= pkg.name %>.min.css'] = dist + 'less/<%= pkg.name %>.less';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      main: {
        src: [
          'bower_components/jquery.easing/js/jquery.easing.js',
          src + 'js/plugins/*.js',
          src + '/js/<%= pkg.name %>.js'
        ],
        dest: dist + 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      main: {
        src: dist + 'js/<%= pkg.name %>.js',
        dest: dist + 'js/<%= pkg.name %>.min.js'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: src,
            src: ['*.html', 'img/**', 'less/**'],
            dest: dist
          },
          {
            expand: true,
            cwd: src,
            src: ['templates/**'],
            dest: web
          }
        ]
      },
      jquery: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/jquery/dist/',
            src: [
              'jquery.js',
              'jquery.min.js'
            ],
            dest: dist + 'js/'
          }
        ]
      },
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/',
            src: [
              'css/bootstrap.css',
              'css/bootstrap.min.css',
              'js/bootstrap.js',
              'js/bootstrap.min.js'
            ],
            dest: dist
          }
        ]
      },
      glyphicons: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/',
            src: [
              'fonts/glyphicons-halflings-regular.eot',
              'fonts/glyphicons-halflings-regular.svg',
              'fonts/glyphicons-halflings-regular.ttf',
              'fonts/glyphicons-halflings-regular.woff'
            ],
            dest: dist
          }
        ]
      }
    },
    less: {
      expanded: {
        options: {
          paths: ["css"]
        },
        files: css
      },
      minified: {
        options: {
          paths: ["css"],
          cleancss: true
        },
        files: css_min
      }
    },
    banner: '/*!\n' +
    ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    ' */\n',
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            dist + 'css/<%= pkg.name %>.css',
            dist + 'css/<%= pkg.name %>.min.css',
            dist + 'js/<%= pkg.name %>.js',
            dist + 'js/<%= pkg.name %>.min.js'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: [
          src + 'js/<%= pkg.name %>.js',
          src + 'js/plugins/*.js'
        ],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      copy: {
        files: [
          src + 'templates/**',
          src + 'img/**',
          src + 'less/**'
        ],
        tasks: ['copy'],
        options: {
          spawn: false
        }
      },
      less: {
        files: [src + 'less/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'copy', 'less', 'usebanner']);
};
