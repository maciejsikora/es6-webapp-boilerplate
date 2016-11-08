/*
###################### DEVELOPMENT ###########################
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

//dev
var watchify = require('watchify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//################DEPENDENCIES####################

var config = require("./config");


var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.global.entryJs, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.global.outputJs))
    .pipe(gulp.dest(config.dev.outputDir))
    .pipe(reload({ stream: true }));
};

// clean the js/css development output directory
gulp.task('clean', function(){

    return gulp.src(config.dev.outputDir,{read:false}).pipe(rimraf({force:true}));
});


gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

/**
SASS AND CSS
**/

//vendor css - node_modules css
gulp.task('vendor-css',['clean'], function () {
    return gulp.src(config.vendorCssFiles)
    .pipe(cleanCSS()) //minify and clean css
    .pipe(concat(config.global.outputVendorCss)) //concat to vendor.css
    .pipe(gulp.dest(config.dev.outputDir)); //save to output dir
});

//compiles sass
gulp.task('compile-css',['vendor-css'], function () {
  return gulp.src(config.global.entrySass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(config.global.outputCss))
    .pipe(gulp.dest(config.dev.outputDir));
});

//build all dev files
gulp.task('build', ['build-persistent','compile-css'], function() {
  process.exit(0);
});

//alias for build
gulp.task('default',['build'],function(){
  process.exit(0);
});


//################DEVELOPMENT SERVERS AND WATCH#####################

//watch sass files
gulp.task('watch-sass',['compile-css'], function () {

  //watch sass files
  return gulp.watch(config.global.entrySass, ['compile-css',function(){

    //refresh on sass change
    bundle();

  }]);

});



//WATCH JS FILES CHANGE
gulp.task('watch', ['build-persistent','watch-sass'], function() {

  getBundler().on('update', function() {

    //refresh on every file change
    bundle();

  });



});

/*
WEB SERVER
*/
var historyApiFallback = require('connect-history-api-fallback')

// WEB SERVER FOR DEVELOPMENT
gulp.task('dev-serve', ['watch'], function () {
  browserSync({
    port:config.global.devServerPort,
    server: {
      baseDir: config.dev.indexDir, //start server in dev directory
      middleware: [
        historyApiFallback()
       ]
    }
  });
});

//WEB SERVER FOR PRODUCTION ( ONLY FOR CHECK IT WORKS - IN REAL PRODUCTION IT WILL RUN ON DIFFERENT WEB SERVER )
//RUN IT AFTER PRODUCTION BUILD - npm run production
gulp.task('prod-serve', function () {
  browserSync({
    port:config.global.devServerPort,
    server: {
      baseDir: config.prod.indexDir, //start server in prod directory
      middleware: [
        historyApiFallback()
       ]
    }
  });
});
