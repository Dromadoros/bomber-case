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

	socket.on('disconnect', function () {
		console.log('User disconnected');
	});

	socket.on('addPlayer', function (player) {
		players.push(player);
		io.sockets.emit('addPlayer',  player);
		console.log(player.name + ' added.');

		if (2 === players.length) {
			console.log('All players are ready.');
			io.sockets.emit('isPlayersReady',
				{
					isReady: true
				}
			);
		}
	});

});