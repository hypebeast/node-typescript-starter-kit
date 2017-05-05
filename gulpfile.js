const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');


// pull in the project TypeScript config
const tsProject = ts.createProject('./tsconfig.release.json', {
  target: 'es5'
});
// source directories
const pathConfig = {
    views: './src/views/**/*.pug',
    css: './src/assets/css/**/*.css'
}
const port = process.env.PORT || 3000;

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', ['scripts']);
  gulp.watch('src/views/**/*.pug', ['copy:views']);
  gulp.watch('src/assets/**/*.css', ['copy:css']);
});

gulp.task('copy:views', () => {
  return gulp
    .src(pathConfig.views)
    .pipe(gulp.dest('./dist/views'));
});

gulp.task('copy:css', () => {
  return gulp
    .src(pathConfig.css)
    .pipe(gulp.dest('./dist/public/css'));
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

gulp.task('browser-sync', () => {
  browserSync.init(
    ["dist/**/*.js", "dist/public/**/*.*", "dist/views/**/*.*"],
    {
      port: 8080,
      proxy: `localhost:${port}`
    }
  );
});

gulp.task('clean', () => {
  return gulp
    .src('./dist')
    .pipe(clean());
});

gulp.task('build', (cb) => {
  runSequence('clean', 'scripts', 'copy:views', 'copy:css', cb);
});

gulp.task('default', (cb) => {
  runSequence('build', ['nodemon', 'browser-sync', 'watch'], cb);
});
