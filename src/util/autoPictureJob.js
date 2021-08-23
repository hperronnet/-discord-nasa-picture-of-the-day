const CronJob = require('cron').CronJob;
const { PREFIX } = process.env;
const { sendPictureOfTheDay } = require('../util/sendPictureOfTheDay.js');
const { sendMessage } = require('../util/messageUtil.js');

let autoPictureJob;
let isJobRunning = new Map();
let lastMessage = new Map();

const initialiseAutoPictureJob = () => {
    autoPictureJob = new CronJob(
        '00 00 8 * * *',
        () => {
            lastMessage.forEach((server, guildId) => {
                if (isJobRunning.get(guildId)) {
                    console.log(
                        `Sending Nasa Astronomy Picture of the Day for server ${guildId}`
                    );
                    sendPictureOfTheDay(server, []);
                }
            });
        },
        null,
        true,
        'America/New_York'
    );
};

const startAutoPicture = (server) => {
    if (!isJobRunning.get(server.guildId)) {
        lastMessage.set(server.guildId, server);
        isJobRunning.set(server.guildId, true);

        const messageCommandActive = `I'll send you the Nasa Astronomy Picture of the Day every day at 8:00AM. To stop, type \`${PREFIX}autopod stop\`.`;
        sendMessage(server, messageCommandActive);
    } else {
        const messageAlreadyActive = `\`${PREFIX}autopod\` is already active in the channel ${
            lastMessage.get(server.guildId).channel
        }.`;
        sendMessage(server, messageAlreadyActive);
    }
};

const stopAutoPicture = (server) => {
    if (isJobRunning.get(server.guildId)) {
        const messageStopCommand =
            "I won't send you the Nasa Astronomy Picture of the Day anymore.";
        sendMessage(server, messageStopCommand);

        isJobRunning.set(server.guildId, false);
    } else {
        const messageNotRunning = `\`${PREFIX}autopod\` is not running.`;
        sendMessage(server, messageNotRunning);
    }
};

module.exports = {
    initialiseAutoPictureJob,
    startAutoPicture,
    stopAutoPicture,
};
