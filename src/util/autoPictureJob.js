const CronJob = require('cron').CronJob;
const { PREFIX } = process.env;
const { sendPictureOfTheDay } = require('../util/sendPictureOfTheDay.js');

let autoPictureJob;
let isJobRunning = new Map();
let lastMessage = new Map();

const initialiseAutoPictureJob = () => {
    autoPictureJob = new CronJob(
        '00 00 8 * * *',
        () => {
            lastMessage.forEach((server, guildId) => {
                if (isJobRunning.get(guildId)) {
                    console.log(`Sending Nasa Astronomy Picture of the Day for server ${guildId}`);
                    sendPictureOfTheDay(server, []);
                }
            });
        },
        null,
        true,
        'America/New_York'
    );
};

const startAutoPicture = (message) => {
    if (!isJobRunning.get(message.guildId)) {
        lastMessage.set(message.guildId, message);
        isJobRunning.set(message.guildId, true);
        message.channel.send(
            `I'll send you the Nasa Astronomy Picture of the Day every day at 8:00AM. To stop, type \`${PREFIX}autopod stop\`.`
        );
    } else {
        message.channel.send(
            `\`${PREFIX}autopod\` is already active in the channel ${
                lastMessage.get(message.guildId).channel
            }.`
        );
    }
};

const stopAutoPicture = (message) => {
    if (isJobRunning.get(message.guildId)) {
        message.channel.send(
            "I won't send you the Nasa Astronomy Picture of the Day anymore."
        );
        isJobRunning.set(message.guildId, false);
    } else {
        message.channel.send(`\`${PREFIX}autopod\` is not running.`);
    }
};

module.exports = {
    initialiseAutoPictureJob,
    startAutoPicture,
    stopAutoPicture,
};
