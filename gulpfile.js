'use strict';

const fs         = require('fs');
const gulp       = require('gulp')
const babelify   = require('babelify');
const browserify = require('browserify');

gulp.task('default', ['watchify']);

gulp.task('watchify', () => {
  gulp.watch('./app/scripts/contentscript.js', ['build']);
});

gulp.task('build', () => {
  browserify('./app/scripts/contentscript')
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .pipe(fs.createWriteStream('./app/dist/contentscript.js'));
});
