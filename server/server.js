const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage}  = require('./utils/message')
const publicPath = path.join(__dirname,'../public');
const port =process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection' ,function(socket){
	console.log('new user connected');

	 //socket.emit form admin text welcome to the chat app

	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

	 //socket.broadcast.emit from admin text new user joined

	 socket.broadcast.emit('newMessage' ,generateMessage('Admin','new user joined'));

	socket.on('createMessage', function(message, callback){
		console.log('new email : ' , message);
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback();

		

	// 	socket.broadcast.emit('newMessage',{
	// 		from :message.from,
	// 		text:message.text,
	// 		createdAt:new Date().getTime()
	// 	});
	});

	socket.on('disconnect',function(){
			console.log('disconnected to server');
		});

});

app.use(express.static(publicPath));

server.listen(port,function(){
	console.log('server is up');
});