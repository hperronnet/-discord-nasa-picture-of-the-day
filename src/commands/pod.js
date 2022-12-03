const { SlashCommandBuilder } = require('discord.js');
const { sendPictureOfTheDay } = require('../util/sendPictureOfTheDay');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pod')
		.setDescription('shows Nasa Astronomy Picture of The Day.')
		.addStringOption(option =>
			option.setName('date')
				.setDescription('The date of the picture you want (format: yyyy-mm-dd). Leave empty if you want today\'s picture')),

	async execute(interaction) {
		// Command without parameter = Today's date by default
		console.log(`Sending pod for ${interaction.channel.guildId}`);
		sendPictureOfTheDay(interaction);
	},
};
