var mongoose = require('mongoose');
var Message = mongoose.model('Message');

exports.index = function (req, res) {
  Message.list({}, function (err, messages) {
    if (err) return res.render('error', { error: 'Error!'});
    res.render('index', {
      title: 'Node-Mongoose Example',
      description: 'An example node mongoose app.',
      author: 'github.com/geothird',
      randomName: mongoose.Types.ObjectId(),
      messages: messages
    });
  });
};