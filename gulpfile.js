var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var flatten = require('gulp-flatten');
var htmlMin = require('gulp-htmlmin');
var inject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');
var ngTemplateCache = require('gulp-angular-templatecache');

var addStream = require('add-stream');
var streamSeries = require('stream-series');

var paths = {
  src: {
    root: './front/src',
    index: './front/src/index.html',
    js: ['./front/src/**/*module*.js', './front/src/**/*.js'],
    css: './front/src/**/*.css',
    html: ['!./front/src/index.html', './front/src/**/*.html'],
  },
  vendor: {
    css: [],
    js: [
      './node_modules/angular/angular.min.js',
      './node_modules/@uirouter/core/_bundles/ui-router-core.min.js',
      './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    ],
  },
  dist: {
    root: './front/dist',
    js: './front/dist/js',
    css: './front/dist/css',
    html: './front/dist/html',
  },
};

gulp.task('clean', () => {
  return gulp.src(paths.dist.root).pipe(clean());
});

gulp.task('connect', () => {
  connect.server({
    root: './front/dist/',
    livereload: true,
  });
});

gulp.task('css', () => {
  return gulp
    .src(paths.src.css)
    .pipe(
      autoprefixer({
        browsers: ['last 3 versions'],
        cascade: true,
      }),
    )
    .pipe(flatten())
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('html', () => {
  return gulp
    .src(paths.src.html)
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(flatten())
    .pipe(ngTemplateCache({ module: 'botsifyApp' }))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('js', () => {
  return gulp
    .src(paths.src.js)
    .pipe(flatten())
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('inject', () => {
  var target = gulp.src(paths.src.index);

  var css = vendorCss()
    .pipe(addStream.obj(userCss()))
    .pipe(gulp.dest(paths.dist.css));

  var js = vendorJs()
    .pipe(addStream.obj(userJs()))
    .pipe(gulp.dest(paths.dist.js));

  return target
    .pipe(
      inject(streamSeries(js, css), {
        addRootSlash: false,
        ignorePath: 'front/dist/',
      }),
    )
    .pipe(gulp.dest(paths.dist.root))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(paths.src.css, ['js', 'inject']);
  gulp.watch(paths.src.html, ['html', 'inject']);
  gulp.watch(paths.src.js, ['css', 'inject']);
});

gulp.task('default', ['inject', 'js', 'html', 'css', 'connect', 'watch']);

function userCss() {
  return gulp
    .src(paths.src.css)
    .pipe(
      autoprefixer({
        browsers: ['last 3 versions'],
        cascade: true,
      }),
    )
    .pipe(flatten());
}

function userJs() {
  return gulp
    .src(paths.src.js)
    .pipe(
      ngAnnotate({
        single_quotes: true,
      }),
    )
    .pipe(flatten());
}

function vendorCss() {
  return gulp.src(paths.vendor.css).pipe(flatten());
}

function vendorJs() {
  return gulp.src(paths.vendor.js).pipe(flatten());
}