const CronJob = require("cron").CronJob;
const { PREFIX } = process.env;
const { sendPictureOfTheDay } = require("../util/sendPictureOfTheDay.js");

let autoPictureJob;
let isJobRunning;
let lastMessage;

const initialiseAutoPictureJob = () => {
    autoPictureJob = new CronJob(
        "00 00 8 * * *",
        () => {
            if (lastMessage) {
                sendPictureOfTheDay(lastMessage, []);
            }
        },
        null,
        false,
        "America/New_York"
    );

    isJobRunning = false;
};

const startAutoPicture = (message) => {
    if (!isJobRunning) {
        lastMessage = message;
        message.channel.send(
            `I'll send you the Nasa Astronomy Picture of the Day every day at 8:00AM. To stop, type \`${PREFIX}autopod stop\`.`
        );
        autoPictureJob.start();
        isJobRunning = true;
    } else {
        message.channel.send(
            `\`${PREFIX}autopod\` is already active in the channel ${lastMessage.channel}.`
        );
    }
};

const stopAutoPicture = (message) => {
    if (isJobRunning) {
        message.channel.send(
            "I won't send you the Nasa Astronomy Picture of the Day anymore."
        );
        isJobRunning = false;
        autoPictureJob.stop();
    } else {
        message.channel.send(`\`${PREFIX}autopod\` is not running.`);
    }
};

module.exports = {
    initialiseAutoPictureJob,
    startAutoPicture,
    stopAutoPicture,
};
