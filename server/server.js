const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection' ,function(socket){
	console.log('new user connected');


	socket.on('createMessage', function(message){
		console.log('new email : ' , message);
		io.emit('newMessage',{
			from: message.from,
			text:message.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect',function(){
			console.log('disconnected to server');
		});

});

app.use(express.static(publicPath));

server.listen(port,function(){
	console.log('server is up');
});
