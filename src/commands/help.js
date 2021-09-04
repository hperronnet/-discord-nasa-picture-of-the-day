const { SlashCommandBuilder } = require('@discordjs/builders');
const { PREFIX } = process.env;
const { DESCRIPTIONS } = require('../constants/detailedDescriptions');
const { sendMessage } = require('../util/messageUtil');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('shows a detailed explanation about a command.'),
    async execute(server, args, client) {
        if (args.length === 0) {
            const helpDetailMessage = `You have to specify the command you need help about. Type \`${PREFIX}nasa\` for the list of all commands.`;
            sendMessage(server.channel, helpDetailMessage);
            return;
        }

        const commandNames = [];
        client.commands.forEach((command) => {
            commandNames.push(command.data.name);
        });

        if (!commandNames.includes(args[0])) {
            const commandNotFoundMessage = `Command not found. Type \`${PREFIX}nasa\` for the list of all commands.`;
            sendMessage(server.channel, commandNotFoundMessage);
            return;
        }

        const name = client.commands.get(args[0]).data.name;
        const description = client.commands.get(args[0]).data.description;
        const helpMessage = `\`${PREFIX}${name}\` ${description} ${DESCRIPTIONS.get(name)}`;
        sendMessage(server.channel, helpMessage);
    },
};
