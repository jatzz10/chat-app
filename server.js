let express = require('express');

// Using app as an instance of 'express' class
let app = express(); 

let http = require('http').Server(app);

let io = require('socket.io')(http);

// GET requst from the application
app.get('/', function(req, res) { 
   res.sendFile(__dirname + '/index.html');
});

// Serving static files like css & js
app.use(express.static(__dirname + '/public')); 

// Server listening on the connection event for incoming sockets
io.on('connection', function(socket) {
   console.log("New user connected.");
   
   socket.name = "Anonymous";

   // Broadcasting messages to all the clients
   socket.broadcast.on('chat-message', function(data) {
      io.emit('chat-message', data);
   });

   socket.on('typing', (data) => {
      console.log(socket.name);
      socket.broadcast.emit('typing', {name: socket.name});
   });

   socket.on('disconnect', function() {
      console.log("A user left.");
   });
});

http.listen(3000, function() {
   console.log("Listening on port: 3000" + "\nUser Status:");
});