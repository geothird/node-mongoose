// Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-mongoose');
exports.mongoose = mongoose;