import {Case} from './Case';

class Game {

	constructor(x = 5, y = 5, nbBombs = 3, socket) {
		this.x = x;
		this.y = y;
		this.nbBombs = Math.abs(nbBombs);
		this.players = [];
		this.cases = [];
		this.mapId = 'map';
		this.currentPlayer = 0;
		this.socket = socket;
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
	 *
	 */
	waitingAllPlayers(){
		const intro = document.getElementById('intro');
		intro.innerHTML = '<h1>Waiting for second player ...</h1>'
	}

	/**
	 * Add new player to list
	 *
	 * @param player
	 */
	addPlayer(player) {
		this.players.push(player);
		console.log(this.players);
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
	}

	/**
	 * Add click event on cases for move player
	 */
	createEventClickCases() {
		const cases = document.getElementsByClassName('case');

		for (let _case of cases) {
			_case.addEventListener('click', this.movePlayer.bind(this));
		}
	}

	/**
	 * Create cases in dom with id as attribute
	 *
	 * @param id
	 * @returns {string}
	 */
	createCaseElement(id) {
		return '<div class="case" data-id="' + id + '"></div>'
	}

	/**
	 * Return div element for map
	 *
	 * @returns {string}
	 */
	createMapElement() {
		return "<div id='map'></div>";
	}

	/**
	 * Create a tab of players score
	 */
	renderPlayerStats() {
		const game = document.getElementById('game');
		if (document.getElementsByClassName('score').length) {
			game.removeChild(document.getElementsByClassName('score')[0]);
		}
		game.insertAdjacentHTML("beforeend", "<div class='score'><h1>Stats of players</h1></div>");
		const score = document.getElementsByClassName('score')[0];
		for (let i in this.players) {
			console.log(this.players[i]);
			console.log(this.players[i].getColor());
			score.innerHTML = score.innerHTML + '<span class="color ' + this.players[i].getColor() + '"></span><p>'
				+ this.players[i].getName() + ' | ' + this.players[i].getHp() + 'hp </p><br>';
		}
	}

	/**
	 * Init all players positions
	 */
	initPlayersPositions() {
		for (let i = 0; i < this.players.length; i++) {
			let x = "";
			if (0 === i % 2) {
				x = i;
			} else {
				x = this.x - i;
			}
			this.players[i].setPosition(x);
			this.players[i].setCaseId(x);
			document.querySelector('[data-id="' + x + '"]').className += ' player ' + this.players[i].color;
		}
	}

	/**
	 * Checking if case is next to player
	 *
	 * Move player to a case and check if it's trap. If so, explosion.
	 * Change to next player
	 *
	 * @param e
	 */
	movePlayer(e) {
		const currentCaseDom = e.target;
		const currentCase = this.getCaseById(e.target.getAttribute('data-id'));
		const oldCase = document.querySelector("[data-id='" + this.players[this.currentPlayer].getCaseId() + "']");
		const oldCaseObject = this.getCaseById(oldCase.getAttribute('data-id'));

		//Check if case is just next to player
		if ((oldCaseObject.getPositionX() + 1 == currentCase.getPositionX() && oldCaseObject.getPositionY() == currentCase.getPositionY() ) ||
			(oldCaseObject.getPositionX() - 1 == currentCase.getPositionX() && oldCaseObject.getPositionY() == currentCase.getPositionY()) ||
			(oldCaseObject.getPositionX() == currentCase.getPositionX() && oldCaseObject.getPositionY() + 1 == currentCase.getPositionY()) ||
			(oldCaseObject.getPositionX() == currentCase.getPositionX() && oldCaseObject.getPositionY() - 1 == currentCase.getPositionY())
		) {
			//todo hover case
		} else {
			return false;
		}

		//Check if a player is on the case
		if (currentCaseDom.classList.contains('player')) {
			return false;
		}
		//If case is trapped and not explosed yet, explosed and the player lose 1 hp
		if (currentCase.getIsTrap() && !currentCase.getIsExplosed()) {
			this.players[this.currentPlayer].setHp(this.players[this.currentPlayer].getHp() - 1);
			currentCase.setIsExplosed(true);
			console.log('Explosed');
			if (0 === this.players[0].getHp()) {
				alert('You\'re dead, try again.');
			}
		}

		//Remove the player on the case; remove class and put it on the new case
		oldCase.className = 'case';
		currentCaseDom.className += ' player ' + this.players[this.currentPlayer].color;
		this.players[this.currentPlayer].setPosition(currentCase.getPositionX(), currentCase.getPositionY());
		this.players[this.currentPlayer].setCaseId(currentCaseDom.getAttribute('data-id'));

		//Define the next player to play
		this.changePlayer();
		this.renderPlayerStats();
	}

	changePlayer() {
		const nextIndexCurrent = this.currentPlayer + 1;
		if (typeof this.players[nextIndexCurrent] == "undefined") {
			this.currentPlayer = 0;
		} else {
			this.currentPlayer++;
		}
	}

	/**
	 * Get case by id
	 *
	 * @param id
	 * @returns {*}
	 */
	getCaseById(id) {
		return this.cases[id];
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
}

export {Game};