/**
 * Dependencies
 * @type {exports}
 */
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('./config/database').mongoose;

/**
 * Configure express app
 */
var app = express();
require('./config/express')(app);

/**
 * Initialize mongodb
 */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('[OK] Db open.');
});

/**
 * Load mongodb models
 */
var models_path = path.join(__dirname, 'models');
fs.readdirSync(models_path).forEach(function (file) {
  console.log('[OK] Model ' + file + ' loaded.');
  if (~file.indexOf('.js')) require(models_path + '/' + file);
});

/**
 * Configure express routes
 */
require('./config/routes')(app);

/**
 *  Create server instance
 * @type {Server|*}
 */
var server = http.createServer(app);

/**
 * Initialize socket.io
 */
require('./config/socket')(server);

server.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});
