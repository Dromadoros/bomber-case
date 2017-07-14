import {Case} from './Case';

class Game {

	constructor(x = 5, y = 5, nbBombs = 3) {
		this.x = x;
		this.y = y;
		this.players = [];
		this.cases = [];
		this.isStarted = false;
		this.mapId = 'map';
		this.nbBombs = Math.abs(nbBombs);
	}

	/**
	 * Add new player to list
	 *
	 * @param player
	 */
	addPlayer(player) {
		this.players.push(player);
	}

	/**
	 * Hide the intro container and create map element
	 */
	setupGame() {
		const intro = document.getElementById('intro');
		intro.style.display = 'none';

		document.getElementById('game').innerHTML = this.createMapElement();
	}

	/**
	 * Set all cases in the map
	 */
	setCases() {
		const map = document.getElementById(this.mapId);
		let id = 0;

		for (let i = 0; i < this.x; i++) {
			const _case = new Case(i, 0);
			this.cases.push(_case);
			map.innerHTML = map.innerHTML + this.createCaseElement(id);
			_case.setup(id);
			id++;
			for (let j = 1; j < this.y; j++) {
				const _case = new Case(i, j);
				this.cases.push(_case);
				map.innerHTML = map.innerHTML + this.createCaseElement(id);
				_case.setup(id);
				id++;
			}
		}
		console.log(this.cases);
	}

	createCaseElement(id) {
		return '<div class="case" data-id="' + id + '"></div>'
	}

	/**
	 * Create a tab of players score
	 */
	renderPlayerStats() {
		const game = document.getElementById('game');
		game.innerHTML = game.innerHTML + "<div class='score'><h1>Stats of players</h1></div>";
		const score = document.getElementsByClassName('score')[0];
		for (let i in this.players) {
			score.innerHTML = score.innerHTML + this.players[i].getName() + ' | ' + this.players[i].getHp() + 'hp <br>';
		}
	}

	/**
	 * Init all players positions
	 */
	initPlayersPositions() {
		for (let i in this.players) {
			this.setPlayerPositions(i);
			for (let j in this.cases) {
				if (this.cases[j].getPositionX() == this.players[i].getPositionX() &&
					this.cases[j].getPositionY() == this.players[i].getPositionY()) {
					this.cases[j].getCaseElement().className += " player";
				}
			}
		}
	}

	movePlayer(x, y, id) {

	}

	getCaseById(id) {
		return this.cases.indexOf(id);
	}

	/**
	 * Set players in map
	 */
	setPlayerPositions(index, x = 0, y = 0) {
		this.players[index].setPosition(index);
	}

	/**
	 * Set hidden trap on {nbBombs} cases
	 */
	setCaseTrap() {
		let tmp_cases = this.cases.slice(0);
		let i = this.nbBombs;

		while (0 !== i) {
			const rand = Math.floor(Math.random() * tmp_cases.length);
			const caseToTrap = tmp_cases[rand].getId();

			this.cases[caseToTrap].setIsTrap(true);
			tmp_cases.splice(rand, i);
			i--;
		}
	}

	/**
	 * Return div element for map
	 *
	 * @returns {string}
	 */
	createMapElement() {
		return "<div id='map'></div>";
	}

	getIsStartedGame() {
		return this.isStarted;
	}

	setIsStartedGame(value) {
		this.isStarted = value;
	}

	getAllPlayers() {
		return this.players;
	}
}

export {Game};