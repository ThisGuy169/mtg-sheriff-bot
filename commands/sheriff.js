const Player = require('../src/player.js');
const Role = require('../src/role.js');

module.exports = {
	name: 'sheriff',
	description: 'Create new sheriff game',
	execute(client, message, args) {
		console.log('message', message);
		// if(message.mentions.users.size < 5){
        //     return message.channel.send('Five players are needed for a game of sheriff');
        // }
		let playerInst = new Player();
		let roles = new Role().loadRoles();
		console.log("roles", roles);
		let players = playerInst.assignPlayers(message.mentions.users, roles);
		console.log("players", players);
		playerInst.messagePlayers(players);

	},
};