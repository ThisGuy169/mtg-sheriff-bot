module.exports = {
	name: 'sheriff',
	description: 'Create new sheriff game',
	execute(message, args) {
		if(message.mentions.length < 5){
            return message.channel.send('Five players are needed for a game of sheriff');
        }
	},
};