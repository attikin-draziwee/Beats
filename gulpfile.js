'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const sassModul = require('gulp-sass-glob');
const gcmq = require('gulp-group-css-media-queries');
const concat = require('gulp-concat');
const cssMinify = require('gulp-css-minify');
const autoPrefix = require('gulp-autoprefixer');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gulpCondition = require('gulp-if');
const babel = require('gulp-babel');
const jsMinify = require('gulp-uglify');

const isProd = process.env.NODE_ENV;

const files = ['./src/*.html', './src/fonts/**/*', './src/img/**/*', './src/video/**/*', './src/scss/**/*', './src/js/**/*', './src/icons/**/*'];
const styles = ['./node_modules/normalize.css/normalize.css', './node_modules/slick-carousel/slick/slick.css', './src/scss/*.scss'];
const jsLibraries = ['./node_modules/jquery/dist/jquery.js', './node_modules/jquery-touchswipe/jquery.touchSwipe.js', './node_modules/mobile-detect/mobile-detect.js', './src/js/**/*', 'node_modules/slick-carousel/slick/slick.js'];

gulp.task('clean', () => gulp.src('./docs/', { read: false })
  .pipe(clean()));

// Copy 
gulp.task('copy:html', () => gulp.src('./src/*.html')
  .pipe(gulp.dest('./docs/'))
  .pipe(reload({ stream: true })));
gulp.task('copy:fonts', () => gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./docs/fonts'))
  .pipe(reload({ stream: true })));
gulp.task('copy:img', () => gulp.src('./src/img/**/*')
  .pipe(gulp.dest('./docs/img/'))
  .pipe(reload({ stream: true })));
gulp.task('copy:video', () => gulp.src('./src/video/**/*')
  .pipe(gulp.dest('./docs/video/'))
  .pipe(reload({ stream: true })));

gulp.task('copy:res', gulp.parallel('copy:html', 'copy:fonts', 'copy:img', 'copy:video'));
// end Copy

gulp.task('sass', () => gulp.src(styles)
  .pipe(sassModul())
  .pipe(sass())
  .pipe(concat('main.min.css'))
  .pipe(gcmq())
  .pipe(gulpCondition(isProd == 'build', autoPrefix({
    browsers: ['last 2 versions'],
  })))
  .pipe(gulp.dest('./docs/'))
  .pipe(reload({ stream: true })));

gulp.task('js-compile', () => gulp.src(jsLibraries)
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulpCondition(isProd === 'build', jsMinify()))
  .pipe(gulp.dest('./docs/js'))
  .pipe(reload({ stream: true })));

gulp.task('icons', () => gulp.src('./src/icons/*.svg')
  .pipe(svgo())
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: '../svg_sprite.svg'
      }
    }
  }))
  .pipe(gulp.dest('./docs/icons'))
  .pipe(reload({ stream: true })));

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./docs"
    },
    open: false,
  });
});

gulp.watch(files, gulp.series('clean', 'copy:res', 'sass', 'icons', 'js-compile'));

gulp.task('default', gulp.series('clean', 'copy:res', 'sass', 'icons', 'js-compile', 'browser-sync'));