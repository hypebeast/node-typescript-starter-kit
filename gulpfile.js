const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');


// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.release.json');
const srcDirs = {
    views: './src/views/**/*.pug',
    public: './src/public/**/*'
}

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

gulp.task('clean', () => {
  return gulp
    .src('dist')
    .pipe(clean());
})

gulp.task('build', ['scripts', 'copy:views', 'copy:public']);

gulp.task('default', ['build', 'watch']);
