const Role = require('../src/role.js');
module.exports = class Player{
	constructor(person, role) {
		this.Person = person;
		this.Role = role;
	}
}