var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var superviewsjs = require('gulp-superviewsjs');

var tsConfig = require("../tsconfig.json").compilerOptions;

gulp.task('template',function(){
    return gulp.src([
        "./src/**/*.html"
    ])
    .pipe(replace(/(<template .+args=")(.+?)"/g,'$1$2 _$ferrugemRegister _$ferrugemLoad"'))
    .pipe(replace('</require>', ''))
    .pipe(replace(/<require from="([^"]*)">/g, '<script>_$ferrugemRegister.add("$1");</script>'))
    .pipe(superviewsjs({mode:"amd"}))
    .pipe(replace(/elementOpen\(("\w+?-[^"]+")([^)]+)\)/g,'_$ferrugemLoad.load($1$2).content(function(){'))
    .pipe(replace(/elementClose\("\w+?-+\w.+\)+?/g,'});'))
    //.pipe(replace(/elementClose\("\w+?-+\w.+\)+?/g,'elementClose("div")'))    
    //.pipe(replace(/elementOpen\(("\w+?-[^"]+")([^)]+)\)/g,'elementOpen("div"$2);_$ferrugemLoad.load($1$2);'))
    //.pipe(replace(/elementOpen(\("\w+?-+\w.+\)+?)/g,'elementOpen$1;_$ferrugemLoad.load$1;'))
    .pipe(rename({
        extname: ".html.js"
    }))
    //.pipe(uglify())
    .pipe(gulp.dest(tsConfig.outDir));
});
