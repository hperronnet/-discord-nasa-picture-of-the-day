const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
	guildId: { type: Number, required: true },
	apodActivated: { type: Boolean, required: true },
	channelId: { type: String, required: true },
});

module.exports = mongoose.model('guilds', GuildSchema);