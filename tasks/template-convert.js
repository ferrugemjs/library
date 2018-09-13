var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var ferrugemjs = require('gulp-ferrugemjs');
var beautify = require('gulp-beautify');
var tsConfig = require("../tsconfig.json").compilerOptions;

gulp.task('template',function(){
    return gulp.src([
        "./src/**/*.html"
    ])
    .pipe(ferrugemjs({
        env:"development"
    }))
    .pipe(beautify({indent_size: 2}))
    .pipe(rename({
        extname: ".html.js"
    }))
    //.pipe(uglify())
    .pipe(gulp.dest(tsConfig.outDir));
});
