const { SlashCommandBuilder } = require('@discordjs/builders');
const { PREFIX } = process.env;

const {
    startAutoPicture,
    stopAutoPicture,
} = require('../util/autoPictureJob.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autopod')
        .setDescription(
            `shows Nasa Astronomy Picture of The Day, every day at 8:00AM (EDT).`
        ),

    async execute(message, args) {
        if (args.length === 0 || !['start', 'stop'].includes(args[0])) {
            // TODO create generic error like `wrongCommandError(name) => ${name} isn't used like that. Type !help ${name} for more details.`
            message.channel.send(
                `\`${PREFIX}autopod\` isn\'t used like that. Type \`${PREFIX}help autopod\` for more details.`
            );
            return;
        }

        if (args[0] === 'start') {
            startAutoPicture(message);
        } else if (args[0] === 'stop') {
            stopAutoPicture(message);
        }
    },
};
