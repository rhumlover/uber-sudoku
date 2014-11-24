'use strict';

var gulp = require('gulp'),
  connect = require('gulp-connect'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  jshint = require('gulp-jshint'),
  clean = require('gulp-clean'),
  dot = require('gulp-dot-precompiler'),
  header = require('gulp-header'),
  uglify = require('gulp-uglify'),
  webpack = require('gulp-webpack');

gulp.task('connect', function() {
  connect.server({
    port: 8888,
    root: 'www',
    livereload: true
  });
});


// CONFIG
var PATHS = {
  html: './src/*.html',
  sass: './src/css/*.sass',
  css: './src/css/*.css',
  js: [
    './src/js/lib/*.js',
    './src/js/*.js'
  ],
  js_vendors: [
    './bower_components/lodash/dist/lodash.underscore.min.js',
    './bower_components/pubsub-js/src/pubsub.js',
    './bower_components/director/build/director.min.js',
    './bower_components/fastclick/lib/fastclick.js',
    './src/js/vendor/zepto.js'
  ],
  templates: './src/templates/*.html'
};


// CLEAN
gulp.task('clean', function() {
  gulp.src('./www/**/*', {read: false})
    .pipe(clean());
});


// HTML
gulp.task('html', function () {
  gulp.src(PATHS.html)
    .pipe(gulp.dest('./www/'))
    .pipe(connect.reload());
});


// SCRIPTS
gulp.task('js', function() {
  gulp.src(PATHS.js)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./www/js/'))
    .pipe(connect.reload());
});

gulp.task('js_vendors', function() {
  gulp.src(PATHS.js_vendors)
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./www/js/vendor/'))
    .pipe(connect.reload());
});

gulp.task('jshint', function() {
  return gulp.src(PATHS.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['jshint', 'js', 'js_vendors']);

// TEMPLATES
gulp.task('templates', function() {
  gulp.src(PATHS.templates)
  .pipe(dot({
    dictionary: 'JST',
    varname: 'it',
  }))
  .pipe(concat('templates.js'))
  .pipe(header('window.JST = {};'))
  .pipe(gulp.dest('./www/templates/'))
  .pipe(connect.reload());
});

// STYLES
gulp.task('css', function () {
  gulp.src(PATHS.css)
    .pipe(gulp.dest('./www/css/'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(PATHS.sass)
    .pipe(sass({
      sourceComments: 'normal',
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./www/css/'))
    .pipe(connect.reload());
});

gulp.task('styles', ['css', 'sass']);


// WATCH
gulp.task('watch', function () {
  gulp.watch([PATHS.html], ['html']);
  gulp.watch([PATHS.sass], ['sass']);
  gulp.watch([PATHS.js], ['jshint', 'js']);
  gulp.watch([PATHS.js_vendors], ['js_vendors']);
  gulp.watch([PATHS.templates], ['templates']);
});


// MAIN
gulp.task('compile', ['html', 'scripts', 'styles', 'templates']);
gulp.task('serve', ['connect', 'watch']);
gulp.task('default', ['compile', 'serve']);
