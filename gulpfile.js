const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');

gulp.task('default', () => {
  return gulp.src('src/index.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(rename('auth-tjcu.es5.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('auth-tjcu.min.js'))
    .pipe(gulp.dest('dist'));
});
