const Role = require('../src/role.js');
const { MessageEmbed } = require('discord.js');

module.exports = class Player{
	constructor(person, role) {
		this.Person = person;
		this.Role = role;
	}
}