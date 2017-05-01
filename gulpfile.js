const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();


// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.release.json');
// source directories
const srcDirs = {
    views: './src/views/**/*.pug',
    public: './src/public/**/*'
}
const port = process.env.PORT || 3000;

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
  gulp.watch('src/views/**/*.pug', ['copy:views']);
  gulp.watch('src/public/**/*', ['copy:public']);
});

gulp.task('copy:views', () => {
  return gulp
    .src(srcDirs.views)
    .pipe(gulp.dest('dist/views'));
});

gulp.task('copy:public', () => {
  return gulp
    .src(srcDirs.public)
    .pipe(gulp.dest('dist/public'));
});

gulp.task('nodemon', (cb) => {
  let started = false;

  return nodemon()
          .on('start', (cb) => {
            if (!started) {
              cb();
              started = true;
            }
          })
          .on('restart', () => {
            setTimeout(() => {
              browserSync.reload({
                stream: false
              });
            }, 500);
          });
});

gulp.task('browser-sync', ['build', 'nodemon', 'watch'], () => {
  browserSync.init(null, {
    proxy: `http://localhost:${port}`,
    files: ["dist/**/*.js", "dist/public/**/*.*", "dist/views/**/*.*"],
    port: 7000
  });
});

gulp.task('clean', () => {
  return gulp
    .src('dist')
    .pipe(clean());
})

gulp.task('build', ['clean', 'scripts', 'copy:views', 'copy:public']);

gulp.task('default', ['build', 'nodemon', 'watch']);
