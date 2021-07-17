const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const Player = require('../src/player.js');
const Role = require('../src/role.js');
module.exports = class Game{
    constructor(creator, createdOn, users){
        this.Creator = creator;
        this.CreatedOn = createdOn;
        this.Roles = this.loadRoles();
        this.Players = this.assignPlayerRoles(users);
        this.messagePlayers();
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

    assignPlayerRoles(users){
		let list = [];
        let role = null;
		let index = null;
        let roles = this.Roles;

		users.forEach(function(user){
            role = roles[Math.floor(Math.random() * roles.length)];
            list.push(new Player(user, role));
			index = roles.indexOf(role);
			if (index !== -1) {
				roles.splice(index, 1);
			}
		});
		// return list of assign Players
		return list;
	}

    messagePlayers(){
		this.Players.forEach(player => {
			let embed = new MessageEmbed();
			embed.setColor(Role.colors[player.Role.Color]);
			embed.setDescription(player.Role.Description);
			embed.setTitle(player.Role.Title);
			embed.setThumbnail("attachment://role.png");
            let message = {
                embed,
                files: [{
                    attachment: player.Role.Image,
                    name: 'role.png'
                }]
            }
			player.send(message);
		});
	}
}