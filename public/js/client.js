$(document).ready(function () {

  var socket = io.connect();

  /**
   * On click create a message object and
   * emit it through socket io
   */
  $('#send_message').bind('click', function () {
    var message = {
      name: $("[name='name']").val(),
      message: $("[name='body']").val()
    };
    socket.emit('message', message);
  });

  /**
   * Listen for server message broadcasts
   * and update the list
   */
  socket.on('server_message', function (data) {
    $('#show_message').prepend(
        '<li class="list-group-item"><p><small>' +
          data.message + '</small></p><h5><small>' +
          data.name + '</small></h5></li>');
  });
});