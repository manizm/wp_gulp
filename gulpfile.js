const gulp = require('gulp')
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const watch = require('gulp-watch')

let sassOptions = {
  outputStyle: 'compressed'
}
let autoprefixerOptions = {
  browsers: ['last 2 versions']
}
function errorLog(error) {
  console.error.bind(error)
  this.emit('end')
}

// Optimize images
gulp.task('optimize-images', (cb) => {
  gulp.src(['./*.png', './*.jpg', './*.gif', './*.jpeg', './src/images/**/*.*',])
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({plugins: [{removeViewBox: true}]})
  ]))
  .pipe(gulp.dest('./'))
})

// Optimize Sass / CSS
gulp.task('css', () => {
  gulp.src('./sass/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(sourcemaps.write())
  .pipe(plumber.stop())
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream())
})

// Optimize JS
gulp.task('scripts', ()=> {
  gulp.src('./src/js/*.js')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('vendor.js'))
  .pipe(uglify()).on('error', errorLog)
  .pipe(sourcemaps.write('maps'))
  .pipe(plumber.stop())
  .pipe(gulp.dest('./js/minjs'))
  .pipe(browserSync.stream())
})

// php source
gulp.task('php', ()=>{
  gulp.src('./*.php')
})

// Watcher
// Serve static site for pre theme development
gulp.task('servestatic', ['scripts', 'css'], () => {
  browserSync.init({
    proxy: "localhost/link-to-your-sitefolder/wp-content/themes/your-theme-name/"
  })
  gulp.watch(['./src/js/*.js'], ['scripts'])
  gulp.watch(['./sass/*.*'], ['css'])
  gulp.watch(['./*.php'], ['php']).on('change', browserSync.reload)
})

// serve xampp server for wordpress development
gulp.task('servedev', ['scripts', 'css'], () => {
  browserSync.init({
    proxy: "localhost/link-to-your-sitefolder/",
    port: 80
  })
  gulp.watch(['./src/js/*.js'], ['scripts'])
  gulp.watch(['./sass/*.*'], ['css'])
  gulp.watch(['./*.php'], ['php']).on('change', browserSync.reload)
})

gulp.task('default', ['serve']);
