/**
 * socket.io
 * Auth:张忠辉
 */

// Express Farmwork
var express = require('express'); 
// Express Farmwork Instance
var app = express();
// HTTP Server
var http = require('http').Server(app); 
// Socket Server
var io = require('socket.io')(http);
// File Stream
var fs = require('fs');
// Listening Port
var port = 8800; 

// HTTP Routes
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/test',function(req,res){
  res.sendFile(__dirname + '/test.html');
});

// Static Files
app.use("/",express.static(__dirname));

// Connecting Event
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat', function(msg){
    io.emit('chat', msg);
  });
});
// Starting my server
http.listen(port, function(){
  console.log('Socket started success!\nlistening to localhost:' + port);
});