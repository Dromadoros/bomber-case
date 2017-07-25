class Person {

	constructor(name, color) {
		this.name = name;
		this.color = color;
		this.hp = 3;
		this.x = 0;
		this.y = 0;
		this.caseId = '';
	}

	setPosition(x, y = 0) {
		this.x = x;
		this.y = y;
	}

	getPositionX(){
		return this.x;
	}

	getPositionY(){
		return this.y;
	}

	getName() {
		return this.name;
	}

	getHp() {
		return this.hp;
	}

	setCaseId(id){
		this.caseId = id;
	}

	getCaseId(){
		return this.caseId;
	}

	setHp(hp) {
		this.hp = hp;
	}

	getColor(){
		return this.color;
	}
}
export {Person}
