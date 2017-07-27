import {Person} from './model/Person';
import {Game} from './model/Game';

let name = "";
let color = "";
const socket = io.connect('http://localhost:8082/');
const game = new Game(5, 5, 3, socket);
const addPlayerButton = "addPlayer";
const addEvents = () => {
	document.getElementById(addPlayerButton).addEventListener('click', setProperties);
};

const setupGame = () => {
	game.setupGame();
	game.setCases();
	game.createEventClickCases();
	game.initPlayersPositions();
	game.setCaseTrap();
	game.renderPlayerStats();
};

const setProperties = () => {
	if (document.querySelector('input[name="color"]:checked')) {
		color = document.querySelector('input[name="color"]:checked').value;
	} else {
		return false;
	}

	name = document.getElementById('name').value;
	document.getElementById('name').value = '';

	if ('' !== name) {
		const player = {name, color};
		socket.emit('addPlayer', player);
		game.waitingAllPlayers();
	}
};

socket.on('addPlayer', function (player) {
	game.addPlayer(new Person(player.name, player.color));
	game.renderPlayerStats();
});

socket.on('isPlayersReady', function (playersState) {
	if (playersState.isReady) {
		setupGame();
	}
});

const init = () => {
	addEvents();
};

init();
