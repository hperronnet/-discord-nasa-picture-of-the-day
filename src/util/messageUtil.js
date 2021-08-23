const sendMessage = (server, content) => {
    server.channel.send(content).catch(error => console.log(`Error while sending message to ${server.guildId}. Message : ${error.message}`));
};

const sendEmbedMessage = (server, content) => {
    server.channel.send({ embeds: [content] }).catch(error => console.log(`Error while sending embed message to ${server.guildId}. Message : ${error.message}`));
};

module.exports = { sendMessage, sendEmbedMessage };
