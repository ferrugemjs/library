var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var tsConfig = require("../tsconfig.json").compilerOptions;

gulp.task('compile',function(){
    //console.log(""+destPackagePathAppView);
    return gulp.src([
			"./src/**/*.ts"
            ,"./jspm_packages/npm/event-emitter-lite@1.0.5/*.d.ts"
        ])
        .pipe(ts(tsConfig))
        .pipe(uglify())
        .pipe(gulp.dest(tsConfig.outDir));   
});

