const { initialiseAutoPictureJob } = require('../../util/autoPictureJob.js');

module.exports = () => {
    console.log("Discord Bot is online!");

    initialiseAutoPictureJob();
};
