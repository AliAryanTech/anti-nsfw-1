const messageHandler = require("./handlers/message");
const nsfwHandler = require("./handlers/nsfw");
const commands = require("./handlers/commands");

const Discord = require('discord.js');
const client = new Discord.Client();

const botconfig = require('./storage/botconfig.json')
const { log } = require('./util/logging');

require('dotenv').config();
require('colors');

const handlers = [
    messageHandler,
    nsfwHandler,
    commands
]

const dateboot = new Date();
log(`\n----- ${dateboot.toLocaleString('en-us')} -----\n`, true, false)

for (const handler of handlers) {
    try {
        handler.onStart();
    } catch (e) {
        log(`${handler.info.name} handler threw an error while running start function - ${e}`) 
    }
}

client.on('ready', () => {
    log(`Logged in - ${client.user.tag}`);

    client.user.setPresence({ game: { name: botconfig.presence.name, type: botconfig.presence.type  }, status: botconfig.presence.status})

    for (const handler of handlers) {
        try {
            handler.onReady();
        } catch (e) {
            log(`${handler.info.name} handler threw an error while running ready function`.red + e) 
        }
    }
});


client.on('message', msg => {
    for (const handler of handlers) {
        try {
            handler.onMessage(msg);
        } catch (e) {
            console.log(`${handler.info.name} handler threw an error while running message function - ${e}`) 
        }
    }
});

client.login(process.env.TOKEN);

module.exports = {
    client
}