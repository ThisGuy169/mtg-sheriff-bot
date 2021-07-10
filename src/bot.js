require('dotenv').config();

const { Client } = require('discord.js');

const client = new Client();
// client.login(process.env.DISCORD_API_BOT_KEY);

console.log(process.env.DISCORD_API_BOT_KEY);