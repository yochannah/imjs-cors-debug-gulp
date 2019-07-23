'use strict';

/**
 * This is the file that configures the project build!
 */


import gulp from 'gulp';
import sourceMaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import minifyCSS from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import streamify from 'gulp-streamify';
import watchify from 'watchify';
import stringify from 'stringify';
import browserify from 'browserify';
import BrowserSync from 'browser-sync';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import assign from 'lodash.assign';

const browserSync = BrowserSync.create();


    //browserify options
    var customOpts = {
      entries: ['./js/index.js'],
        debug: true
        }
    var opts = assign({}, watchify.args, customOpts);
    var b, i=0;

    gulp.task('js', bundleOnce); // so you can run `gulp js` to build the file just once
    gulp.task('jsdev', bundleDev); // so you can run `gulp jsdev` to build the file and reload in browser automatically

    //master bundle file
    function bundle(fileName) {
      return b
        .transform(stringify(['.html']))
        .bundle()
          //log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(fileName))
//        .pipe(streamify(uglify({mangle:false})))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./dist'));
    }

    //build once. for use mostly when 'gulp' is run (default task)
    function bundleOnce() {
      b = browserify(opts);
      return bundle("bundle.js");
    }

    //build and reload, and keep watching for more changes
    function bundleDev(){
      b = watchify(browserify(opts));
      b.on('update', bundle); // on any dep update, runs the bundler
      b.on('log', gutil.log); // output build logs to terminal
      return bundle("bundle.js");
    }

/*
This is the one that makes a live server with autorefresh for all your debuggy needs.
Helper function. You probably don't want to call it directly.
 */
gulp.task('serve', ['jsdev'], function() {

    browserSync.init({
        server: "./",
        online:true,
        open:false
    });

    gulp.watch("./dist/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});



//These are the tasks most likely to be run by a user

/*
Starts server for dev use. To use in the command line run `gulp dev`
 */
gulp.task('dev', [
  'serve', //includes css
  'jsdev'
], function() {
  gutil.log(gutil.colors.yellow('| =================================================='));
  gutil.log(gutil.colors.yellow('| Congrats, it looks like everything is working!'));
  gutil.log(gutil.colors.yellow('| Browsersync is running on the ports below and will'));
  gutil.log(gutil.colors.yellow('| Live-reload your js and CSS as you work.'));
  gutil.log(gutil.colors.yellow('| ____________________________________________'));
  gutil.log(gutil.colors.yellow('|'));
  gutil.log(gutil.colors.yellow('| To run tests while working, open a new terminal and run:'));
  gutil.log(gutil.colors.yellow('| mocha --watch'));
  gutil.log(gutil.colors.yellow('| =================================================='));
});


/*
Build for prod use. Just run `gulp`, and the results will appear in the dist folder :)
 */
gulp.task('default', [
  'js',
], function() {
  gutil.log(gutil.colors.green('| =====================|'));
  gutil.log(gutil.colors.green('|   Project built! :)  |'));
  gutil.log(gutil.colors.green('| =====================|'));
});
