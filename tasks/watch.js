var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

gulp.task('static_serve', function() {
  connect.server({
    root: ".",
    port: 9001,
    livereload: true
  });
});

gulp.task('reload',function(){
	connect.reload();
});



gulp.task('watch',['compile','template'],function(){
    gulp.run('static_serve');
    gulp.watch("./src/**/*.html", ['template']);
    gulp.watch('./src/**/*.ts', ['compile']);

    gulp.watch('./dist/**/*.*').on('change',function(file){
    	gulp.src(file.path).pipe(connect.reload());
    });

});