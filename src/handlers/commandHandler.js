const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

const { BOT_TOKEN } = process.env;

module.exports = async (client) => {
	const commandFiles = fs
		.readdirSync('src/commands')
		.filter((file) => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		client.commands.set(command.data.name, command);
		console.log(`Command ${command.data.name} registred`);
		client.commandArray.push(command.data.toJSON());
	}

	const clientId = '875870506308472845';

	const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(clientId), {
			body: client.commandArray,
		});
	}
	catch (error) {
		console.log(error);
	}
};