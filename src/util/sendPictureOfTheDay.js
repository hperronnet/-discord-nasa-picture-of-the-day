const { EmbedBuilder } = require('discord.js');
const { getAstronomyPictureOfTheDay } = require('../api');
const moment = require('moment');
const { isValidDate } = require('../util/dateUtil');
const { PREFIX } = process.env;
const { sendReply, sendReplyEmbed, sendEmbed } = require('./messageUtil');

const sendPictureOfTheDay = async (interaction) => {
	const date = interaction.options.get('date')?.value ?? moment().format('YYYY-MM-DD');
	if (!isValidDate(date.toString())) {
		const messageInvalidParameter = `The given parameter is invalid. Type \`${PREFIX}help pod\` for more details.`;
		sendReply(interaction, messageInvalidParameter);
		return;
	}

	const res = await getAstronomyPictureOfTheDay(date);

	if (res.code !== 200) {
		sendReply(interaction, res.msg);
		return;
	}

	const messageResponse = formatPod(res);

	sendReplyEmbed(interaction, messageResponse);
};

const sendAutoPod = async (channel, channelId) => {
	const date = moment().format('YYYY-MM-DD');

	const res = await getAstronomyPictureOfTheDay(date);

	if (res.code !== 200) {
		sendEmbed(channel, res.msg);
		return;
	}

	const messageResponse = formatPod(res);


	sendEmbed(channel, channelId, messageResponse);
};

const formatPod = (res) => {

	const title = `**${res.title}** \n\n`;
	const explanation = `*${res.explanation}* \n`;
	const footer = res.copyright ? `${res.copyright} - ${res.date}` : res.date;

	const messageResponse = new EmbedBuilder()
		.setColor('#195aa8')
		.setTitle(title)
		.setFooter({ text: footer });

	if (res.media_type === 'image') {
		messageResponse
			.setImage(res.hdurl || res.url)
			.setDescription(explanation);
	}
	else {
		messageResponse
			.setURL(res.url)
			.setThumbnail(res.thumbnail_url)
			.setDescription(explanation + ` ${res.url}`);
	}

	if (res.media_type === 'image') {
		messageResponse
			.setImage(res.hdurl || res.url)
			.setDescription(explanation);
	}
	else {
		messageResponse
			.setURL(res.url)
			.setThumbnail(res.thumbnail_url)
			.setDescription(explanation + ` ${res.url}`);
	}

	return messageResponse;
};

module.exports = { sendPictureOfTheDay, sendAutoPod };
