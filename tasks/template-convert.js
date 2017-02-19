var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var ferrugemjs = require('gulp-ferrugemjs');

var tsConfig = require("../tsconfig.json").compilerOptions;

gulp.task('template',function(){
    return gulp.src([
        "./src/**/*.html"
    ])
    .pipe(ferrugemjs({formatCode:true}))
    .pipe(rename({
        extname: ".html.js"
    }))
    //.pipe(uglify())
    .pipe(gulp.dest(tsConfig.outDir));
});
