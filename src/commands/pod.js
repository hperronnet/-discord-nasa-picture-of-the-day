const { SlashCommandBuilder } = require("@discordjs/builders");
const { sendPictureOfTheDay } = require("../util/sendPictureOfTheDay");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pod")
        .setDescription("shows Nasa Astronomy Picture of The Day."),
    async execute(message, args) {
        // Command without parameter = Today's date by default
        console.log(`Sending pod for ${message.channel.guildId}`);
        sendPictureOfTheDay(message.channel, args);
    },
};
