// allows access to env file
require('dotenv').config();
// file system
const fs = require('fs');
// load needed discord classes
const { Collection, Client } = require('discord.js');
// grabs bot prefix (!)
const prefix = process.env.DISCORD_BOT_PREFIX;

// when the client is ready, run this code
// this event will only trigger one time after logging in
const client = new Client();
client.once('ready', () => {
	console.log('Ready!');
});
// login to Discord with your app's token
client.login(process.env.DISCORD_BOT_TOKEN);

client.commands = new Collection();

// gets all the files from the commands dir
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// listens for messages, execute commands
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    }
    catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
    }

});