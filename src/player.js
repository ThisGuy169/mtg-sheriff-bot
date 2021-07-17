const Role = require('../src/role.js');
const { MessageEmbed } = require('discord.js');

module.exports = class Player{
	constructor(person, role) {
		this.Person = person;
		this.Role = role;
	}

	assignPlayers(mentions, roles){
		let list = [];
		let person = null;
        let role = null;
		let index = null;

		mentions.forEach(function(mention){
            person = mention;
            role = roles[Math.floor(Math.random() * roles.length)];
            list.push(new Player(person, role));
			index = roles.indexOf(role);
			if (index !== -1) {
				roles.splice(index, 1);
			}
		});
		// return list of assign Players
		return list;
	}

	messagePlayers(playerList)
	{
		playerList.forEach(player => {
			let message = new MessageEmbed();
			message.setColor(Role.colors[player.Role.Color]);
			message.setDescription(player.Role.Description);
			message.setTitle(player.Role.Title);
			// message.setThumbnail(player.Role.Image);
			// message.setImage(player.Role.Image);
			// p.person.send(embed=embedVar, file=file)
			console.log(message)
			//player.Person.send(message)

		})
		
	}

}