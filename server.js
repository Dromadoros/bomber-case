var express = require('express');
var app = express();
var players = [];

//Static resources server
app.use(express.static(__dirname + '/'));

var server = app.listen(8082, function () {
	var port = server.address().port;
	console.log('Server running at port %s', port);
});

var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
	console.log('User connected');
	io.sockets.emit('someoneConnected');

	socket.on('disconnect', function () {
		console.log('User disconnected');
		for(var i = 0; i < players.length; i++){
			if(players[i].id == socket.id){
				players.splice(i, 1);
				return false;
			}
		}
	});

	socket.on('addPlayer', function (player) {
		players.push(socket);
		io.sockets.emit('addPlayer', player);
		console.log(player.name + ' added.');

		if (2 === players.length) {
			console.log('All players are ready.');
			io.sockets.emit('isPlayersReady');
		}
	});

});