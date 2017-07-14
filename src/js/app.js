import {Person} from './model/Person';
import {Game} from './model/Game';

//name of the player
let name = "";
const game = new Game(2, 3);
const buttonPlayButton = "playButton";
const addPlayerButton = "addPlayer";

const addEvents = () => {
	document.getElementById(addPlayerButton).addEventListener('click', setName);
	document.getElementById(buttonPlayButton).addEventListener('click', setupGame);
};

const setupGame = () => {
	game.setupGame();
	game.setCases();
	game.initPlayersPositions();
	game.setCaseTrap();
	game.renderPlayerStats();
	game.setIsStartedGame(true);
};

const setName = () => {

	name = document.getElementById('name').value;
	document.getElementById('name').value = '';

	if ('' !== name) {
		const player = new Person(name);
		game.addPlayer(player);
	}
};

const init = () => {
	addEvents();
	setName();
};

init();
