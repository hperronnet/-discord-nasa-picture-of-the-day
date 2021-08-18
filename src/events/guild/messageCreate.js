const { PREFIX } = process.env;

module.exports = async (Discord, client, message) => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLocaleLowerCase();
	const command = client.commands.get(commandName);
	
	if (command) command.execute(message, args, client);
};
