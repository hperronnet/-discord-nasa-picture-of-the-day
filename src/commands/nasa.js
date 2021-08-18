const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { PREFIX } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nasa')
        .setDescription('shows the list of all commands.'),
    async execute(message, args, client) {
        let commandString = 'These are the supported commands: \n\n';

        client.commands.forEach((command) => {
            commandString += `\`${PREFIX}${command.data.name}\` ${command.data.description}\n`;
        });

        commandString += `\nType \`${PREFIX}help commandName\` for a detailed explanation about a command. Ex: \`!help pod\`.`;

        message.channel.send(commandString);
    },
};
