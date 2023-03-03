'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    svgsprite = require('gulp-svg-sprite'),
    concat = require('gulp-concat'),
    del = require('del'),
    gcmq = require('gulp-group-css-media-queries'),
    browsersync = require('browser-sync'),
    sassGlob = require('gulp-sass-glob'),
    htmlPartial = require('gulp-html-partial'),
    fileinclude = require('gulp-file-include'),
    gulpHtmlImgWrapper = require('gulp-html-img-wrapper'),
    webp = require('gulp-webp');

var path = {
    src: {
        html: './_source/*.html',
        htmlpartial: './_source/html/',
        js: './_source/js/**/*.js',
        style: './_source/css/**/*\.scss',
        css: './_source/css/**/*\.css',
        img: './_source/img/**/*.*',
        svg: './_source/svg/**/*\.svg',
        font: './_source/font/**/*\.*',
        module: './_source/module/**/*.*',
        favicon: './_source/favicon/*.*'
    },
    build: {
        html: './_assets/',
        svgpartial: './_assets/svg/',
        js: './_assets/js/',
        style: './_assets/css/',
        css: './_assets/css/',
        img: './_assets/img/',
        svg: './_assets/svg/',
        font: './_assets/font/',
        module: './_assets/module/',
        favicon: './_assets/favicon/'
    }
};

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: '_assets'
        },
        notify: false
    });
    done();
};

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function clean() {
    return del(["_assets"]);
}

function jsWebpBuild() {
    return gulp.src(path.src.img)
        .pipe(webp())
        .pipe(gulp.dest(path.build.img))
};

function jsWorkBuild() {
    return gulp.src(path.src.js)
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream());
};
function jsBuild() {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream());
};

function styleBuild() {
    return gulp.src(path.src.style)
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(prefixer({ overrideBrowserslist: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'], cascade: false }))
        .pipe(gcmq())
        .pipe(cssnano({ zindex: false }))
        .pipe(gulp.dest(path.build.style))
        .pipe(browsersync.stream());
};

function cssBuild() {
    return gulp.src(path.src.css)
        .pipe(prefixer({ overrideBrowserslist: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'], cascade: false }))
        .pipe(cssnano({ zindex: false }))
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream());
};


function imgBuild() {
    return gulp.src(path.src.img)
        //.pipe(imagemin())
        .pipe(rename(function (path) {
            path.extname = (path.extname + "").toLowerCase();
        }))
        .pipe(gulp.dest(path.build.img));
};

function imgWorkBuild() {
    return gulp.src(path.src.img)
        .pipe(rename(function (path) {
            path.extname = (path.extname + "").toLowerCase();
        }))
        .pipe(gulp.dest(path.build.img));
};

function svgBuild() {
    return gulp.src(path.src.svg)
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgsprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(path.build.svg));
};

function fontBuild() {
    return gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font));
};

function moduleBuild() {
    return gulp.src(path.src.module)
        .pipe(gulp.dest(path.build.module));
};

function faviconBuild() {
    return gulp.src(path.src.favicon)
        .pipe(gulp.dest(path.build.favicon));
};

function htmlBuild() {
    return gulp.src(path.src.html)
        .pipe(htmlPartial({
            basePath: path.build.svgpartial,
            tagName: 'partial',
            variablePrefix: '@@'
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(
        //     gulpHtmlImgWrapper({
        //         logger: true, // false for not showing message with amount of wrapped img tags for each file
        //         extensions: ['.jpg', '.png', '.jpeg'], // write your own extensions pack (case insensitive)
        //     })
        // )
        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream());
};



gulp.task('build',
    gulp.series(clean, gulp.parallel(
        htmlBuild,
        jsBuild,
        styleBuild,
        cssBuild,
        imgBuild,
        jsWebpBuild,
        svgBuild,
        fontBuild,
        moduleBuild,
        faviconBuild
    )));

gulp.task('watchFiles', function () {

    gulp.watch([path.src.html], htmlBuild, browserSyncReload);

    gulp.watch([path.src.js], jsWorkBuild, browserSyncReload);

    gulp.watch([path.src.style], styleBuild, browserSyncReload);

    gulp.watch([path.src.css], cssBuild, browserSyncReload);

    gulp.watch([path.src.img], imgWorkBuild, browserSyncReload);

    gulp.watch([path.src.svg], svgBuild, browserSyncReload);

    gulp.watch([path.src.font], fontBuild, browserSyncReload);

    gulp.watch([path.src.module], moduleBuild, browserSyncReload);

});

gulp.task('default', gulp.parallel(gulp.parallel('build', 'watchFiles'), browserSync));