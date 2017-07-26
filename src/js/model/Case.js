class Case {

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.isExplosed = false;
		this.isTrap = false;
		this.id = '';
	}

	setup(id) {
		this.id = id;
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
