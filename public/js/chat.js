$(function () {
  let socket = io();
    
  // When the user submit the message
  $('form').submit(function() { 
    let data = {
      name: $('#userName').val(), 
      message: $('#clientMessage').val()
    };

    socket.emit('chat-message', data);  // Client sending the message to the Server
    $('#userName').prop('disabled', true);
    $('#clientMessage').val('');
    return false;
  });

  // Client socket listening to the event emitted by the server
  socket.on('chat-message', function(data) {
    $('#messages').append($('<li>').text(data.name + ": " + data.message));
  });

  $('#clientMessage').on('keypress', () => {
    socket.emit('typing');
  });

  socket.on('typing', (data) => {
    $('<li>').html("<p><i>" + data.name + "is typing a message..." + "</i></p>");
  });

});
