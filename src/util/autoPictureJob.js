const CronJob = require('cron').CronJob;
const { PREFIX } = process.env;
const { sendAutoPod } = require('../util/sendPictureOfTheDay');
const { sendReply } = require('../util/messageUtil');
const GuildSchema = require('../schemas/guildSchema');

const initialiseAutoPictureJob = (client) => {
	new CronJob(
		'00 00 8 * * *',
		async () => {
			const guilds = await GuildSchema.find();

			console.log(guilds.length);

			guilds.forEach(async (guild) => {
				const channel = await client.channels.fetch(guild.channelId).catch((error) => {
					console.log(
						`Error while fetching channel ${guild.guildId}. Message : ${error.message}`,
					);
				});
				if (channel && guild.apodActivated) {
					console.log(
						`Autopod - Sending Nasa Astronomy Picture of the Day for server ${guild.guildId}`,
					);
					sendAutoPod(channel, guild.channelId);
				}
			});
		},
		null,
		true,
		'America/New_York',
	);
};

const startAutoPicture = async (server, client) => {
	let guildInDB = await GuildSchema.findOne({ guildId: server.guildId });

	if (!guildInDB) {
		guildInDB = await new GuildSchema({
			guildId: server.guildId,
			apodActivated: false,
			channelId: ' ',
		}).save();
	}

	if (!guildInDB.apodActivated) {
		await GuildSchema.findOneAndUpdate(
			{
				guildId: server.guildId,
			},
			{
				$set: {
					apodActivated: true,
					channelId: server.channelId,
				},
			},
		);

		const messageCommandActive = `I'll send you the Nasa Astronomy Picture of the Day every day at 8:00AM. To stop, type \`${PREFIX}autopod stop\`.`;
		sendReply(server, messageCommandActive);
	}
	else {
		const channel = await client.channels.fetch(guildInDB.channelId);
		const messageAlreadyActive = `\`${PREFIX}autopod\` is already active in the channel ${channel}.`;
		sendReply(server, messageAlreadyActive);
	}
};

const stopAutoPicture = async (server) => {
	const guildInDB = await GuildSchema.findOne({ guildId: server.guildId });

	if (guildInDB && guildInDB.apodActivated) {
		const messageStopCommand =
            'I won\'t send you the Nasa Astronomy Picture of the Day anymore.';
		sendReply(server, messageStopCommand);

		await GuildSchema.findOneAndUpdate(
			{
				guildId: server.guildId,
			},
			{
				$set: {
					apodActivated: false,
				},
			},
		);
	}
	else {
		const messageNotRunning = `\`${PREFIX}autopod\` is not running.`;
		sendReply(server, messageNotRunning);
	}
};

module.exports = {
	initialiseAutoPictureJob,
	startAutoPicture,
	stopAutoPicture,
};
