class Case {

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.isExplosed = false;
		this.isTrap = false;
		this.id = '';
		this.links = [
			'pmi science', 'sextoy', '2 girls 1 cup', 'gay', 'Why i\'m a looser'
		];
		this.link = '';
		this.caseElement = '';
	}

	setup(id) {
		this.id = id;
		this.caseElement = document.querySelectorAll("[data-id='" + this.id + "']")[0];
	}

	getPositionX() {
		return this.x;
	}

	getPositionY() {
		return this.y;
	}

	getIsExplosed() {
		return this.isExplosed;
	}

	setIsExplosed(value) {
		this.isExplosed = value;
	}

	getId() {
		return this.id;
	}

	setIsTrap(value) {
		this.isTrap = value;
	}

	getIsTrap(){
		return this.isTrap;
	}
}

export {Case};
