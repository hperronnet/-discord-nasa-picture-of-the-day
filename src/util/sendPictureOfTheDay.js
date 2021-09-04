const { MessageEmbed } = require('discord.js');
const { getAstronomyPictureOfTheDay } = require('../api');
const moment = require('moment');
const { isValidDate } = require('../util/dateUtil');
const { PREFIX } = process.env;
const { sendMessage, sendEmbedMessage } = require('./messageUtil');

const sendPictureOfTheDay = async (channel, args) => {
    const date = args.length === 0 ? moment().format('YYYY-MM-DD') : args[0];
    if (!isValidDate(date.toString())) {
        const messageInvalidParameter = `The given parameter is invalid. Type \`${PREFIX}help pod\` for more details.`;
        sendMessage(channel, messageInvalidParameter);
        return;
    }

    const res = await getAstronomyPictureOfTheDay(date);

    if (res.code !== 200) {
        sendMessage(channel, res.msg);
        return;
    }

    const title = `**${res.title}** \n\n`;
    const explanation = `*${res.explanation}* \n`;
    const footer = res.copyright ? `${res.copyright} - ${res.date}` : res.date;

    const messageResponse = new MessageEmbed()
        .setColor('#195aa8')
        .setTitle(title)
        .setDescription(explanation)
        .setImage(res.hdurl)
        .setFooter(footer);

    if (res.media_type === 'image') {
        messageResponse
            .setImage(res.hdurl || res.url)
            .setDescription(explanation);
    } else {
        messageResponse
            .setURL(res.url)
            .setThumbnail(res.thumbnail_url)
            .setDescription(explanation + ` ${res.url}`);
    }

    sendEmbedMessage(channel, messageResponse);
};

module.exports = { sendPictureOfTheDay };
