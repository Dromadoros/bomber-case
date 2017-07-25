import {Person} from './model/Person';
import {Game} from './model/Game';

//name of the player
let name = "";
let color = "";
const game = new Game(5, 5);
const buttonPlayButton = "playButton";
const addPlayerButton = "addPlayer";

const addEvents = () => {
	document.getElementById(addPlayerButton).addEventListener('click', setName);
	document.getElementById(buttonPlayButton).addEventListener('click', setupGame);
};

const setupGame = () => {
	game.setupGame();
	game.setCases();
	game.createEventClickCases();
	game.initPlayersPositions();
	game.setCaseTrap();
	game.renderPlayerStats();
};

const setName = () => {
	color = document.querySelector('input[name="color"]:checked').value;
	name = document.getElementById('name').value;
	document.getElementById('name').value = '';

	if ('' !== name) {
		const player = new Person(name, color);
		game.addPlayer(player);
	}
};

const init = () => {
	addEvents();
};

init();
