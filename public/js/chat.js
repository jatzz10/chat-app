$(function () {
	let socket = io();
    
	// When user submit the message
  $('form').submit(function() { 
    let data = {
      name: $('#userName').val(), 
      message: $('#clientMessage').val()
    };

    socket.emit('chat-message', data);  // Client sending messages to the Server
    $('#userName').prop('disabled', true);
    $('#clientMessage').val('');
    return false;
  });

  // Server updating the messages of the Client's side
  socket.on('chat-message', function(data) {
	  $('#messages').append($('<li>').text(data.name + ": " + data.message));
	});
});