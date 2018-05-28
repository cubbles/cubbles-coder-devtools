'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = function (grunt) {
  grunt.registerTask('+webpackage-build', 'build the webpackage', function () {
    var done = this.async();
    var webPackConfigPath = path.join('..', grunt.config.get('param.src'), 'webpack.config.js');

    const compiler = webpack(require(webPackConfigPath));
    compiler.run(function (err, stats) {
      if (err) {
        grunt.log.error(err.stack || err);
        if (err.details) {
          grunt.log.error(err.details);
        }
        grunt.fail.fatal('FAILED.');
      }

      const info = stats.toJson();
      if (stats.hasErrors()) {
        grunt.fail.fatal(info.errors);
      }
      if (stats.hasWarnings()) {
        grunt.log.error(info.warnings);
      }
      done();
    });
  });
};
