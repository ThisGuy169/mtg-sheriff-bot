const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const Player = require('../src/player.js');
const Role = require('../src/role.js');
const randomWords = require('random-words');

module.exports = class Game{
    constructor(creator, createdOn, users, name){
        this.Name = name ?? this.createName();
        this.Creator = creator;
        this.CreatedOn = createdOn;
        this.Roles = this.loadRoles();
        this.Players = this.assignPlayerRoles(users);
        this.messagePlayers();
    }

    createName()
    {
        let gameList = this.loadGames();
        let gameName = randomWords({exactly:1, wordsPerString:2, separator:'-', maxLength: 6});
        while(gameList.some(g => g.Name === gameName)){
            gameName = randomWords({exactly:1, wordsPerString:2, separator:'-', maxLength: 6});
        }

        return gameName;
    }

    loadGames(){
        let gameList = [];
        let dataFile = fs.readFileSync('./data/currentGames.json', 'utf8');
        let gameData = JSON.parse(dataFile);

        gameData.forEach(element => {
            gameList.pop(new Game(element.Creator, element.CreatedOn, element.Players, element.Name));
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

    saveGame(game)
    {
        let gameList = this.loadGames();
        gameList.push(game);
        let gameJSON = JSON.stringify(game);
        
        fs.writeFileSync('./data/currentGames.json', gameJSON);
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
			player.User.send(message);
		});
	}
}