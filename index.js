const messageHandler = require("./handlers/message");
const Discord = require('discord.js');
const nsfwHandler = require("./handlers/nsfw");
const client = new Discord.Client();
const { log } = require('./util/logging');
require('dotenv').config();
require('colors');

const handlers = [
    messageHandler,
    nsfwHandler
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