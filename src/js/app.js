import {Person} from './model/Person';
import {Game} from './model/Game';

let name = "";
let color = "";
const game = new Game(5, 5);
const buttonPlayButton = "playButton";
const addPlayerButton = "addPlayer";

const addEvents = () => {
	document.getElementById(addPlayerButton).addEventListener('click', setProperties);
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

const setProperties = () => {
	if(document.querySelector('input[name="color"]:checked')){
		color = document.querySelector('input[name="color"]:checked').value;
	}else{
		return false;
	}

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
