const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { PREFIX } = process.env;
const { DESCRIPTIONS } = require('../constants/detailedDescriptions.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('shows a detailed explanation about a command.'),
    async execute(message, args, client) {
        if (args.length === 0) {
            message.channel.send(
                `You have to specify the command you need help about. Type \`${PREFIX}nasa\` for the list of all commands.`
            );
            return;
        }

        const commandNames = [];
        client.commands.forEach((command) => {
            commandNames.push(command.data.name);
        });

        if (!commandNames.includes(args[0])) {
            message.channel.send(
                `Command not found. Type \`${PREFIX}nasa\` for the list of all commands.`
            );
            return;
        }

        const name = client.commands.get(args[0]).data.name;
        const description = client.commands.get(args[0]).data.description;
        message.channel.send(
            `\`${PREFIX}${name}\` ${description} ${DESCRIPTIONS.get(name)}`
        );
    },
};
