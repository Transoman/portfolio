var gulp = require('gulp'),
		sass = require('gulp-sass'),
		pug = require('gulp-pug'),
		autoprefixer = require('gulp-autoprefixer'),
		browserSync = require('browser-sync').create();


var dirs = {
	'styleDir' : 'app/sass/**/*.sass',
	'pugDir' : 'app/pug/page/*.pug'
};


gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "app"
		},
		notify: false
	});
});

gulp.task('styles', function() {
	return gulp.src(dirs.styleDir)
	.pipe(sass({
		outputStyle: 'expanded',
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
			cascade: false
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('template', function() {
	return gulp.src(dirs.pugDir)
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('app'))
	.pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync', 'template', 'styles'], function() {
	gulp.watch(dirs.styleDir, ['styles']);
	gulp.watch(dirs.pugDir, ['template'], browserSync.reload);
});

gulp.task('default', ['watch']);