var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');

var gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('static/stylesheets'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('static/stylesheets'))
        .pipe(gzip(gzip_options))
        .pipe(gulp.dest('static/stylesheets'))
        .pipe(livereload());
});

gulp.task('watch',function(){
    livereload.listen();
    gulp.watch('scss/*.scss', ['sass']);

    gulp.watch('**/templates/*').on('change', livereload.changed);
});

gulp.task('default', ['sass', 'watch']);
