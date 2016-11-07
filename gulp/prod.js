/*
###################### PRODUCTION ###########################
*/
//################DEPENDENCIES####################
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var rimraf = require('gulp-rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');

//for css sass
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

//concating files
var concat = require('gulp-concat');
//for minify files top production
var uglify = require('gulp-uglify');
var pump = require('pump');

//################DEPENDENCIES####################

var config = require("./config");


var prodBundler;
function getProdBundler() {
  if (!prodBundler) {
    prodBundler = browserify(config.global.entryJs, _.extend({ debug: false }) );
  }
  return prodBundler;
};


//cleans production directory
gulp.task('build-prod-clean', function(cb){

    return gulp.src(config.prod.indexDir+"**/*",{read:false}).pipe(rimraf({force:true}));
});

//copies all files from dev to prod
gulp.task("build-prod-copy",["build-prod-clean"],function(){

  //copy all files without dist - files for development to prod directory
  return gulp.src([config.dev.indexDir+"**/*"]).pipe(gulp.dest(config.prod.indexDir));

});

/*
COMPILING CSS LIBS TO ONE FILE
*/
gulp.task('build-prod-vendor-css',['build-prod-copy'], function () {
    return gulp.src(config.vendorCssFiles)
    .pipe(cleanCSS()) //minify and clean css
    .pipe(concat(config.global.outputVendorCss))
    .pipe(gulp.dest(config.prod.outputDir));
});

//compile sass
gulp.task('build-prod-css',['build-prod-vendor-css'], function () {
  return gulp.src(config.global.entrySass)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(concat(config.global.outputCss))
    .pipe(gulp.dest(config.prod.outputDir));
});


//runs babelify
gulp.task("build-prod-babel",["build-prod-copy"],function(cb){

  pump([
     getProdBundler().transform(babelify).bundle(),
     source(config.global.outputJs),
     gulp.dest(config.prod.outputDir)
   ],cb);
 }
);

//FOR PRODUCTION MAIN TASK
gulp.task('build-prod',["build-prod-babel","build-prod-css"],function(cb){

    pump([
    gulp.src(config.prod.outputDir+"*.js"),
    uglify({
        mangle:false
    }),
    gulp.dest(config.prod.outputDir)
  ],cb);



});
/*
END PRODUCTION
*/
