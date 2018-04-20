'use strict';

var gulp       	   = require('gulp'),
	sass       	   = require('gulp-sass'),
	prefixer   	   = require('gulp-autoprefixer'),
	imagemin       = require('gulp-imagemin'),
    combineMq      = require('gulp-combine-mq'),
    uglify         = require('gulp-uglify'),
    sourcemaps     = require('gulp-sourcemaps'),
	gulpif     	   = require('gulp-if'),
    del            = require('del');

// Build Variables
// -------------------------------------

var envDev = false;
var prefixerBrowsers = ['> 0%', 'IE >= 9', 'Firefox >= 12', 'Opera >= 12.11'];

// Paths
// -------------------------------------

var path = {
    build: {
        html:  'dist/',
        js:    'dist/js/',
        css:   'dist/css/',
        img:   'dist/images/',
        media: 'dist/media/',
        libs:  'dist/libs/',
        fonts: 'dist/fonts/',
    },
    src: {
        html:  ['src/*.html', 'src/*.php', 'src/favicon.ico'],
        js:    ['src/js/**/*.js', 'src/js/.*js'],
        style: ['src/scss/*.scss'],
        img:   ['src/images/**/*.*'],
        media: ['src/media/**/*.*'],
        libs:  ['src/libs/**/*.*'],
        fonts: ['src/fonts/**/*.*', '!src/fonts/**/*.json', '!src/fonts/**/*.scss'],
    },
    watch: {
        html:  ['src/**/*.html', 'src/**/*.php', 'src/favicon.ico'],
        js:    ['src/js/**/*.js'],
        style: ['src/scss/**/*.scss'],
        img:   ['src/images/**/*.*'],
        media: ['src/media/**/*.*'],
        libs:  ['src/libs/**/*.*'],
        fonts: ['src/fonts/**/*.*', '!src/fonts/**/*.json', '!src/fonts/**/*.scss'],
    },
    clean: 'dist'
};

// Build imagemin
//--------------------------------------

gulp.task('img', function() {
    return gulp.src('src/images/**/*.*')
    .pipe(imagemin())
	.pipe(gulp.dest(path.build.img))
});


// Build HTML
// -------------------------------------
gulp.task('html', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
});

// Build CSS
// -------------------------------------
gulp.task('css', function () {
    gulp.src(path.src.style)
        .pipe(gulpif(envDev, sourcemaps.init()))
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
            }).on('error', sass.logError))
        .pipe(gulpif(envDev, sourcemaps.write({includeContent: false, sourceRoot: '/src'})))
        .pipe(prefixer({ browsers: prefixerBrowsers, cascade: false }))
        .pipe(gulpif(!envDev, combineMq()))
        .pipe(gulp.dest(path.build.css))
});

// Build JS
// -------------------------------------
gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(gulpif(envDev, sourcemaps.init()))
        .pipe(gulpif(envDev, sourcemaps.write()))
        .pipe(gulp.dest(path.build.js))
});

// Build Fonts
// -------------------------------------
gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Build Libs
// -------------------------------------
gulp.task('libs', function() {
    gulp.src(path.src.libs)
        .pipe(gulp.dest(path.build.libs))
});

// Build Media
// -------------------------------------
gulp.task('media', function() {
    gulp.src(path.src.media)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.media))
});

// DEL
// -------------------------------------
gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

// Build All
// -------------------------------------
gulp.task('build', [
    'clean',
    'html',
    'css',
    'js',
    'img',
    'fonts',
    'libs',
    'media'
]);
// Watcher
// -------------------------------------
gulp.task('watch', function(){
    gulp.watch(path.watch.html, function(e, cb) {
        gulp.start('html');
    });
    gulp.watch(path.watch.style, function(e, cb) {
        gulp.start('css');
    });
    gulp.watch(path.watch.js, function(e, cb) {
        gulp.start('js');
    });
    gulp.watch(path.watch.img, function(e, cb) {
        gulp.start('img');
    });
    gulp.watch(path.watch.fonts, function(e, cb) {
        gulp.start('fonts');
    });
    gulp.watch(path.watch.libs, function(e, cb) {
        gulp.start('libs');
    });
    gulp.watch(path.watch.media, function(e, cb) {
        gulp.start('media');
    });
});


// Default
// -------------------------------------
gulp.task('default', ['build', 'watch']);
