const gulp = require("gulp");
const del = require("del");

// Paths
const paths = {
  build: "./dist",
  source: "./source",
};

// Clean Destination
function taskCleanDestination() {
  return del([`${paths.build}/**/*`]);
}

// Copy Javascript
function taskCopyJavascript() {
  return gulp.src(`${paths.source}/index.js`).pipe(gulp.dest(paths.build));
}

// Copy Icons
function taskCopyIcons() {
  return gulp
    .src(`${paths.source}/icons/**/*`)
    .pipe(gulp.dest(`${paths.build}/icons`));
}

// Build Library
const taskBuildLibrary = gulp.series([
  taskCleanDestination,
  taskCopyIcons,
  taskCopyJavascript,
]);

// Exports
exports.clean = taskCleanDestination;
exports.copyJs = taskCopyJavascript;
exports.copyIcons = taskCopyIcons;
exports.build = taskBuildLibrary;
