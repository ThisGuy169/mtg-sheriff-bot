const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const Player = require('../src/player.js');
const Role = require('../src/role.js');
module.exports = class Game{
    constructor(creator, createdOn, players){
        this.Creator = creator;
        this.CreatedOn = createdOn;
        this.Players = players;
        this.roles = this.loadRoles();
    }

    loadGames(){
        let gameList = [];
        let dataFile = fs.readFile('./data/currentGames.json', 'utf8');
        let gameData = JSON.parse(dataFile);

        gameData.forEach(element => {
            gameList.pop(new Game(element.Creator, element.CreatedOn, element.Players));
        });

        return gameList;
    }

    loadRoles(){
        let dataFile = fs.readFileSync('./data/roles.json', 'utf8');
        let roleData = JSON.parse(dataFile);
        let roleList = [];

        roleData.forEach(element => {
            roleList.push(new Role(element.roleID, element.title, element.description, element.image, element.color));
        });

        return roleList;
    }

    assignPlayers(mentions, roles){
		let list = [];
		let person = null;
        let role = null;
		let index = null;

		players.forEach(function(player){
            person = player;
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

    messagePlayers(){
		players.forEach(player => {
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