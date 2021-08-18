const { PREFIX } = process.env;
const moment = require('moment');

const DESCRIPTIONS = new Map();
const todaysDate = moment().format('YYYY-MM-DD');

DESCRIPTIONS.set(
    'autopod',
    `\nType \`${PREFIX}autopod start\` to start the command.\nType \`${PREFIX}autopod stop\` to stop the command.`
);
DESCRIPTIONS.set('help', ``);
DESCRIPTIONS.set('nasa', ``);
DESCRIPTIONS.set(
    'pod',
    `\nType \`${PREFIX}pod\` to get the Astronomy Picture of the Day.\nType \`${PREFIX}pod <date>\` to get the Astronomy Picture of the Day of a given date.\nEx: \`${PREFIX}pod ${todaysDate}\``
);

module.exports = {
    DESCRIPTIONS,
};
