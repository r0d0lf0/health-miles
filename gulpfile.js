var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var webdriver = require('gulp-webdriver');
var path = require('path');
var args = require('yargs').argv;

// remove any previously transpiled code
gulp.task('clean', function() {
    return gulp.src('test/es5-specs', {read: false})
    	.pipe(rimraf());
});

// transpile to use ES6
gulp.task('transpile', ['clean'], function(){
    return gulp.src('test/specs/*.js')
		.pipe(babel())
		.pipe(gulp.dest('test/es5-specs'));
});

// lint task
gulp.task('lint', function() {
    return gulp.src(['test/**/*.js', '!test/es5-specs/*.js'])
        .pipe(jshint())
        .pipe(jshint({ esnext: true }))
        .pipe(jshint.reporter('default'));
});

// watch files for changes
gulp.task('watch', function() {
    return gulp.watch('test/**/*.js', ['lint']);
});

// run tests by passing --on [local, phantom, browserstack, tep] --in [qal, e2e, prd] NO NEED for --in hard coded it to prd
gulp.task('test', ['default'], function() {
	return gulp.src('conf/wdio.conf.' + args.on + '.js')
		.pipe(webdriver({
			// https://github.com/webdriverio/gulp-webdriver/issues/20
			// 1) override wdioBin
			// 2) in wdio.conf.js add compilers: ['js:babel-core/register'] to mochaOpts
			wdioBin:  path.join(__dirname, 'node_modules', '.bin', 'wdio'),
            on: args.on,
            in: args.in
		}));
});

// default task
gulp.task('default', ['clean', 'transpile', 'lint']);
