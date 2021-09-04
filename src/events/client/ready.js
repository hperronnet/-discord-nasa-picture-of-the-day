const { initialiseAutoPictureJob } = require('../../util/autoPictureJob');
const { PREFIX } = process.env;

module.exports = (Discord, client) => {
    console.log('Discord Bot is online!');
    client.user.setActivity(`${PREFIX}nasa`);

    initialiseAutoPictureJob(client);
};
