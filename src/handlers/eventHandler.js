const fs = require('fs');

module.exports = (client) => {
	const loadDir = (dir) => {
		const eventFiles = fs
			.readdirSync(`src/events/${dir}`)
			.filter((file) => file.endsWith('.js'));

		for (const file of eventFiles) {
			const event = require(`../events/${dir}/${file}`);
			const eventName = event.name;

			if (event.once) client.once(event.name, interaction => event.execute(interaction, client));
			else client.on(eventName, interaction => event.execute(interaction, client));
		}
	};

	['client'].forEach(e => loadDir(e));
};
