module.exports = {
	name: 'kill-sheriff',
	description: 'Kills the sheriff bot',
	execute(client, message, args) {
        client.destroy();
	},
};