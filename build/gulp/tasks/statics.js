'use strict';

const fs = require('fs');
const path = require('path');
const cwd = require('cwd');
const bcParser = require('../bower-component-parser');
const bowerCfg = JSON.parse(fs.readFileSync(cwd('.bowerrc'), 'utf-8').toString());

module.exports = function(gulp, plugins, cfg) {
  gulp.task('statics', statics);

  function statics() {
    let otherStatics;
    let bowerFiles = [];

    // Grab all the important bower files programmatically without having to list them out explicitly
    bowerFiles = bcParser();

    bowerFiles = bowerFiles.filter(function(file) {
      return file.indexOf('-sass') === -1;
    });

    gulp // Copy over necessary bower files
      .src(bowerFiles, {base: cfg.statics.bower.baseDir})
      .pipe(gulp.dest(cfg.statics.bower.dest))
      ;

    // Get all other statics that aren't bower_components
    otherStatics = [
      path.join(bowerCfg.directory, '../**'),
      `!${path.join(bowerCfg.directory, '**')}`
    ];

    gulp // Copy over all other statics
      .src(otherStatics, {base: cfg.statics.bower.baseDir})
      .pipe(gulp.dest(cfg.statics.bower.dest))
      ;
  }
};
