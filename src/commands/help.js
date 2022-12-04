const { SlashCommandBuilder } = require('discord.js');
const { PREFIX } = process.env;
const { DESCRIPTIONS } = require('../constants/detailedDescriptions');
const { sendReply } = require('../util/messageUtil');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('shows a detailed explanation about a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command you need help about')
				.setRequired(true)
				.addChoices(
					// TODO dynamicly add choices
					{ name: 'nasa', value: 'nasa' },
					{ name: 'pod', value: 'pod' },
					{ name: 'autopod', value: 'autopod' },
					{ name: 'help', value: 'help' },
				)),

	async execute(interaction, client) {
		const option = interaction.options.get('command').value;

		if (!option) {
			const helpDetailMessage = `You have to specify the command you need help about. Type \`${PREFIX}nasa\` for the list of all commands.`;
			sendReply(interaction, helpDetailMessage);
			return;
		}

		const commandNames = [];
		client.commands.forEach((command) => {
			commandNames.push(command.data.name);
		});

		if (!commandNames.includes(option)) {
			const commandNotFoundMessage = `Command not found. Type \`${PREFIX}nasa\` for the list of all commands.`;
			sendReply(interaction, commandNotFoundMessage);
			return;
		}

		const name = client.commands.get(option).data.name;
		const description = client.commands.get(option).data.description;
		const helpMessage = `\`${PREFIX}${name}\` ${description} ${DESCRIPTIONS.get(name)}`;
		sendReply(interaction, helpMessage);
	},
};
