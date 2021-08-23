const missingPermissionMessage =
    "Hi, I'm the Discord bot Nasa Picture of the Day ! It seems that I do not have the permission to send message in the channel you tried to use me. Please be sure i'm able to write in this channel by enabling 'Send message' in the channel permissions.";

const sendMessage = (server, content) => {
    server.channel.send(content).catch((error) => {
        if (error.httpStatus === 403) {
            sendToAuthor(server, missingPermissionMessage);
        }
        console.log(
            `Error while sending message to ${server.guildId}. Message : ${error.message}`
        );
    });
};

const sendEmbedMessage = (server, content) => {
    server.channel.send({ embeds: [content] }).catch((error) => {
        if (error.httpStatus === 403) {
            sendToAuthor(server, missingPermissionMessage);
        }
        console.log(
            `Error while sending embed message to ${server.guildId}. Message : ${error.message}`
        );
    });
};

const sendToAuthor = (server, content) => {
    server.author
        .send(content)
        .catch((error) =>
            console.log(
                `Error while sending private message to ${server.author.guildId}. Message : ${error.message}`
            )
        );
};

module.exports = { sendMessage, sendEmbedMessage };
