const { initialiseAutoPictureJob } = require('../../util/autoPictureJob');
const { PREFIX } = process.env;

module.exports = {
	name: 'ready',
	once: true,
	async execute(interaction, client) {
		console.log('Discord Bot is online!');
		client.user.setActivity(`${PREFIX}nasa`);

		initialiseAutoPictureJob(client);
	},
};

