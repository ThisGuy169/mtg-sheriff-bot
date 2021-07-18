const Game = require('../src/game.js');

module.exports = {
	name: 'sheriff',
	description: 'Create new sheriff game',
	execute(client, message, args) {
		// console.log('message', message);
		// if(message.mentions.users.size < 5){
        //     return message.channel.send('Five players are needed for a game of sheriff');
        // }

		// Username#1318
		let creator = `${message.author.username}#${message.author.discriminator}`;
		// 07/16/2021 7:51:47 PM
		let date = new Date(Date.now()).toLocaleDateString("en-US");
		let time = new Date(Date.now()).toLocaleTimeString("en-US");
		let createdOn = `${date} ${time}`;
		let users = message.mentions.users;
		let newGame = new Game(creator, createdOn, users);
		newGame.saveGame(newGame);

		let sheriff = newGame.Players.find(player => {
			return player.Role.RoleID === 1
		});
		message.reply(`Good luck Sheriff ${sheriff.User.tag}! Game name ${newGame.Name}`)
	},
};