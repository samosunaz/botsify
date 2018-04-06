var gulp = require('gulp');
var inject = require('gulp-inject');

var paths = {
    src: {
        root: './src',
        index: './src/index.html',
        js: './src/**/*.js',
        css: './src/**/*.css',
        html: './src/**/*.html',
    },
    dist: {
        root: './dist',
        js: './dist/js',
        css: './dist/css',
        html: './dist/html',
    },
};

gulp.task('inject', () => {
    var target = gulp.src(paths.src.index);
    var sources = gulp.src([paths.src.css, paths.src.js], { read: false });

    return target.pipe(inject(sources)).pipe(gulp.dest(paths.dist.root));
});
