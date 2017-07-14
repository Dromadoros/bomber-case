class Person {

	constructor(name) {
		this.name = name;
		this.hp = 3;
		this.x = 0;
		this.y = 0;
		this.id = '';
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

	setId(id){
		this.id = id;
	}

	getId(){
		return this.id;
	}

	setHp(hp) {
		this.hp = hp;
	}
}
export {Person}
