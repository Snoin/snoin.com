var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var copy = require('gulp-copy2');
var run_sequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var path = {
  src: 'static_src/',
  dst: 'snoin/web/static/',
  node: 'node_modules/'
};

var js = [
  path.dst + 'source/vendors/jquery.js',
  path.dst + 'source/vendors/bootstrap.js',
  path.dst + 'source/**/*.js'
];

var scss = path.dst + 'sass/style.scss';

gulp.task('copy_js', function() {
  return copy([
    {
      src: path.node + 'jquery/dist/jquery.js',
      dest: path.dst + 'source/vendors/'
    },
    {
      src: path.node + 'bootstrap-sass/assets/javascripts/bootstrap.js',
      dest: path.dst + 'source/vendors/'
    }
  ]);
});

gulp.task('copy_scss', function() {
  return copy([
    {
      src: path.node + 'bootstrap-sass/assets/stylesheets/**/*.scss',
      dest: path.dst + 'sass/bootstrap/'
    },
    {
      src: path.node + 'font-awesome/scss/**/*.scss',
      dest: path.dst + 'sass/font-awesome/'
    }
  ]);
});

gulp.task('copy_etc', function() {
  return copy([
    {
      src: path.node + 'bootstrap-sass/assets/fonts/bootstrap/*',
      dest: path.dst + 'fonts/bootstrap/'
    },
    {
      src: path.node + 'font-awesome/fonts/*',
      dest: path.dst + 'fonts/'
    }
  ]);
});

gulp.task('build_js', ['copy_js'], function() {
  return gulp.src(js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('../map'))
    .pipe(gulp.dest(path.dst + 'js/'));
});

gulp.task('build_scss', ['copy_scss'], function() {
  return gulp.src(scss)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write('../map'))
    .pipe(gulp.dest(path.dst + 'css/'));
});

gulp.task('js', function(cb) {
  return run_sequence('copy_js', 'build_js', cb);
});

gulp.task('scss', function(cb) {
  return run_sequence('copy_scss', 'build_scss', cb);
});

gulp.task('default', function(cb) {
  return run_sequence(['js', 'scss', 'copy_etc'], cb);
});

gulp.task('watch', function() {
  gulp.watch(js, ['js']);
  gulp.watch(scss, ['scss']);
});
