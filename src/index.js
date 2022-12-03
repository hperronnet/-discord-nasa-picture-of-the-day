require('dotenv').config({ path: './.env' });
const Discord = require('discord.js');

const { startDB } = require('./mongo');

const { BOT_TOKEN } = process.env;

const intents = [
	Discord.GatewayIntentBits.Guilds,
	Discord.GatewayIntentBits.GuildMessages,
];
const client = new Discord.Client({ intents });
client.commands = new Discord.Collection();
client.commandArray = [];

['commandHandler', 'eventHandler'].forEach((file) => {
	require(`./handlers/${file}`)(client);
});

// Connecting to Database
startDB().then(() => {
	client.login(BOT_TOKEN);
});

