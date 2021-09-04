// const missingPermissionMessage =
//     "Hi, I'm the Discord bot Nasa Picture of the Day ! It seems that I do not have the permission to send message in the channel you tried to use me. Please be sure i'm able to write in this channel by enabling 'Send message' in the channel permissions.";

const sendMessage = (channel, content) => {
    channel && channel.send(content).catch((error) => {
        // TODO HANDLE THAT
        // if (error.httpStatus === 403) {
        //     sendToAuthor(server, missingPermissionMessage);
        // }
        console.log(
            `Error while sending message to ${channel.guildId}. Message : ${error.message}`
        );
    });
};

const sendEmbedMessage = (channel, content) => {
    channel && channel.send({ embeds: [content] }).catch((error) => {
        // TODO HANDLE THAT
        // if (error.httpStatus === 403) {
        //     sendToAuthor(server, missingPermissionMessage);
        // }
        console.log(
            `Error while sending embed message to ${channel.guildId}. Message : ${error.message}`
        );
    });
};

// const sendToAuthor = (author,  content) => {
//     author
//         .send(content)
//         .catch((error) =>
//             console.log(
//                 `Error while sending private message to ${author.guildId}. Message : ${error.message}`
//             )
//         );
// };

module.exports = { sendMessage, sendEmbedMessage };
