module.exports = {
	name: 'sheriff',
	description: 'Create new sheriff game',
	execute(client, message, args) {
		console.log('message', message);
		if(message.mentions.users.size < 5){
            return message.channel.send('Five players are needed for a game of sheriff');
        }
	},
};