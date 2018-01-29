const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const es6to5 = require('gulp-6to5');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

//Copy all HTML files from src to public
gulp.task('copyHTML', function(){
	gulp.src('src/*.html')
		.pipe(gulp.dest('public'));
});

//Compail scss file to css
gulp.task('sass', function(){
	gulp.src('src/sass/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.stream());
});

//Concat compail to es5 and minify js scripts
gulp.task('scripts', function(){
	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(es6to5())
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

//Images minify
gulp.task('imagesmin', function(){
	gulp.src('src/images/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/images'));
})

//Build for production
gulp.task('build', ['copyHTML', 'sass', 'scripts', 'imagesmin'])

//Watch for dev
gulp.task('watch', ['build'], function(){

	browserSync.init({
		server: 'public'
	});

	gulp.watch('src/*.html', ['copyHTML']).on('change', browserSync.reload);
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['scripts']).on('change', browserSync.reload);
	gulp.watch('src/images/*.*', ['imagesmin']).on('change', browserSync.reload);
});



