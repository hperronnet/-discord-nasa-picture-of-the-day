require('dotenv').config({ path: '../.env' });
const Discord = require('discord.js');

const { BOT_TOKEN } = process.env;

const intents = [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES];
const client = new Discord.Client({ intents });
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach((file) => {
	require(`./handlers/${file}`)(Discord, client);
});

client.login(BOT_TOKEN);
