var logger = require('morgan');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

/**
 * Exports app configuration
 * @param app
 */
module.exports = function (app) {
  // view engine setup
  app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(logger('dev'));
    app.use(require('stylus').middleware(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(app.router);
  });
};