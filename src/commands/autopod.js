const { SlashCommandBuilder } = require('discord.js');
const { PREFIX } = process.env;
const { sendMessage } = require('../util/messageUtil');

const {
	startAutoPicture,
	stopAutoPicture,
} = require('../util/autoPictureJob');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autopod')
		.setDescription(
			'shows Nasa Astronomy Picture of The Day, every day at 8:00AM (EDT).',
		)
		.addStringOption(option =>
			option.setName('choice')
				.setDescription('start to activate, stop to deactivate')
				.setRequired(true)
				.addChoices(
					{ name: 'start', value: 'start' },
					{ name: 'stop', value: 'stop' },
				)),

	async execute(interaction, client) {
		const option = interaction.options.get('choice')?.value;

		if (option === undefined) {
			// TODO create generic error like `wrongCommandError(name) => ${name} isn't used like that. Type !help ${name} for more details.`
			const wrongUsageMessage = `\`${PREFIX}autopod\` isn't used like that. Type \`${PREFIX}help autopod\` for more details.`;
			sendMessage(interaction, wrongUsageMessage);
			return;
		}

		if (option === 'start') {
			startAutoPicture(interaction, client);
		}
		else if (option === 'stop') {
			stopAutoPicture(interaction, client);
		}
	},
};
