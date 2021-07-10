require('dotenv').config();

const { Client } = require('discord.js');

const client = new Client();
// client.login(process.env.DISCORD_BOT_TOKEN);

console.log(process.env.DISCORD_BOT_TOKEN);