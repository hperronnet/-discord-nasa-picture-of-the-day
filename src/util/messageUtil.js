// const missingPermissionMessage =
//     "Hi, I'm the Discord bot Nasa Picture of the Day ! It seems that I do not have the permission to send message in the channel you tried to use me. Please be sure i'm able to write in this channel by enabling 'Send message' in the channel permissions.";

const sendMessage = (interaction, content) => {
	interaction.reply({ content }).catch((error) => {
		// TODO HANDLE THAT
		// if (error.httpStatus === 403) {
		//     sendToAuthor(server, missingPermissionMessage);
		// }
		console.log(
			`Error while sending message to ${interaction.channel.guildId}. Message : ${error.message}`,
		);
	});
};

const sendEmbedMessage = (interaction, content) => {
	interaction.reply({ embeds: [content] }).catch((error) => {
		// TODO HANDLE THAT
		// if (error.httpStatus === 403) {
		//     sendToAuthor(server, missingPermissionMessage);
		// }
		console.log(
			`Error while sending embed message to ${interaction.guildId}. Message : ${error.message}`,
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
