var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');
var webpack = require('webpack-stream');

const plugins = require('gulp-load-plugins')();

function jasmineTaskHelper(o) {
  var options = Object.assign(
    {entry: null, watch: true, output: {filename: 'spec.js'}}, o);
  const config = Object.assign(require('./webpack.config.js'), options);
  return gulp.src(['js/spec/**/*_spec.js'])
    .pipe(plugins.plumber())
    .pipe(webpack(config));
}

gulp.task('jasmine', function() {
  var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return jasmineTaskHelper({plugins: [plugin]})
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({whenReady: plugin.whenReady}));
});

gulp.task('spec:jasmine', function() {
  return jasmineTaskHelper({watch: false})
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless());
});

gulp.task('lint', function() {
  return gulp.src(['js/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format('stylish'))
    .pipe(plugins.eslint.failOnError());
});
