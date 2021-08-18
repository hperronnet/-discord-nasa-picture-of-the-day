const { MessageEmbed } = require('discord.js');
const { getAstronomyPictureOfTheDay } = require('../api.js');
const moment = require('moment');
const { isValidDate } = require('../util/dateUtil.js');
const { PREFIX } = process.env;

const sendPictureOfTheDay = async (
    message,
    args
) => {
    const date = args.length === 0 ? moment().format('YYYY-MM-DD') : args[0];
    if (!isValidDate(date.toString())) {
        message.channel.send(`The given parameter is invalid. Type \`${PREFIX}help pod\` for more details.`);
        return;
    }

    const res = await getAstronomyPictureOfTheDay(date);

    if (res.code !== 200) {
        message.channel.send(res.msg);
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

    message.channel.send({ embeds: [messageResponse] });
};

module.exports = { sendPictureOfTheDay };
