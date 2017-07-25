import {Case} from './Case';

class Game {

	constructor(x = 5, y = 5, nbBombs = 3) {
		this.x = x;
		this.y = y;
		this.players = [];
		this.cases = [];
		this.mapId = 'map';
		this.nbBombs = Math.abs(nbBombs);
		this.currentPlayer = 0;
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
	 * @param id
	 * @returns {string}
	 */
	createCaseElement(id) {
		return '<div class="case" data-id="' + id + '"></div>'
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
			score.innerHTML = score.innerHTML + this.players[i].getName() + ' | ' + this.players[i].getHp() + 'hp <br>';
		}
	}

	/**
	 * Init all players positions
	 */
	initPlayersPositions() {
		for (let i = 0; i < this.players.length; i++) {
			let x = "";
			if(0 === i%2){
				x = i;
			}else{
				x = this.x	 - i;
			}
			console.log(x);
			this.players[i].setPosition(x);
			this.players[i].setCaseId(x);
			document.querySelector('[data-id="' + x + '"]').className += ' player '+ this.players[i].color;
		}
	}

	/**
	 * Move player to a case and check if it's trap. If so, explosion.
	 *
	 * @param e
	 */
	movePlayer(e) {
		const currentCaseDom = e.target;
		const currentCase = this.getCaseById(e.target.getAttribute('data-id'));

		//todo : check if case is near to player

		if (currentCase.getIsTrap() && !currentCase.getIsExplosed()) {
			this.players[this.currentPlayer].setHp(this.players[0].getHp() - 1);
			currentCase.setIsExplosed(true);
			console.log('Explosed');
			if (0 === this.players[0].getHp()) {
				alert('You\'re dead, try again.');
			}
		}
		const oldCase = document.querySelector("[data-id='" + this.players[this.currentPlayer].getCaseId() + "']");
		oldCase.className = 'case';

		currentCaseDom.className += ' player '+ this.players[this.currentPlayer].color;
		this.players[this.currentPlayer].setPosition(currentCase.getPositionX(), currentCase.getPositionY());
		this.players[this.currentPlayer].setCaseId(currentCaseDom.getAttribute('data-id'));
		const nextIndexCurrent = this.currentPlayer + 1;
		if (typeof this.players[nextIndexCurrent] == "undefined") {
			this.currentPlayer = 0;
		} else {
			this.currentPlayer++;
		}
		console.log(this.currentPlayer);
		this.renderPlayerStats();
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

	/**
	 * Return div element for map
	 *
	 * @returns {string}
	 */
	createMapElement() {
		return "<div id='map'></div>";
	}
}

export {Game};