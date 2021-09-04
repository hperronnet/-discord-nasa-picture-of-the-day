const { SlashCommandBuilder } = require('@discordjs/builders');
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
            `shows Nasa Astronomy Picture of The Day, every day at 8:00AM (EDT).`
        ),

    async execute(server, args, client) {
        if (args.length === 0 || !['start', 'stop'].includes(args[0])) {
            // TODO create generic error like `wrongCommandError(name) => ${name} isn't used like that. Type !help ${name} for more details.`
            const wrongUsageMessage = `\`${PREFIX}autopod\` isn\'t used like that. Type \`${PREFIX}help autopod\` for more details.`;
            sendMessage(server.channel, wrongUsageMessage)
            return;
        }

        if (args[0] === 'start') {
            startAutoPicture(server, client);
        } else if (args[0] === 'stop') {
            stopAutoPicture(server, client);
        }
    },
};
