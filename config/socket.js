var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports = function (server) {
  //Setup Socket.IO
  var io = require('socket.io').listen(server);

  /**
   * Listen for message and save/rebroadcast
   */
  io.sockets.on('connection', function (socket) {
    console.log('Client Connected');

    socket.on('message', function (data) {
      var message = new Message(data);
      message.save(function (err, msg) {
        if (err) console.error(err);
        console.log('[OK] Saved message by ' + msg.name + '.');
      });
      socket.broadcast.emit('server_message', message);
      socket.emit('server_message', message);
    });

    socket.on('disconnect', function () {
      console.log('Client Disconnected.');
    });
  });
};