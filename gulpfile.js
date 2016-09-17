var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    //watch = require('gulp-watch'),
    autoprefixer = require("gulp-autoprefixer"),
    rename = require('gulp-rename');


gulp.task('ugLify', function() {
    return gulp.src('./public/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('cssmin', function() {
    return gulp.src('./public/css/**/*.css')
        .pipe(cssmin())
        .pipe(concat('all.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('cssmin', function() {
    return gulp.src('./public/css/**/*.css')
        .pipe(cssmin())
        .pipe(concat('all.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('cssmin', function() {
    return gulp.src('./public/css/**/*.css')
        .pipe(cssmin())
        .pipe(autoprefixer())
        .pipe(concat('all.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));
});
