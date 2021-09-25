const fs = require('fs');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Lists commands and usage',
  execute(client, message, args) {
    let helpEmbed = new MessageEmbed();
    // gets all the files from the commands dir
    const commandFiles = fs
      .readdirSync('./commands')
      .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      if (command.name != 'help') {
        // add command to list of fields in embed
        helpEmbed.addField(`!${command.name}`, `${command.description}`);
      }
    }
    message.reply(helpEmbed);
  },
};
