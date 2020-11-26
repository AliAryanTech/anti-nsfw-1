const messageHandler = require("./handlers/message");
const Discord = require('discord.js');
const nsfwHandler = require("./handlers/nsfw");
const client = new Discord.Client();
require('dotenv').config();

const handlers = [
    messageHandler,
    nsfwHandler
]

for (const handler of handlers) {
    try {
        handler.onStart();
    } catch (e) {
        console.log(`${handler.info.name} handler threw an error while running start function - ${e}`) 
    }
}

client.on('ready', () => {
    console.log(`Logged in - ${client.user.tag}`);
    for (const handler of handlers) {
        try {
            handler.onReady();
        } catch (e) {
            console.log(`${handler.info.name} handler threw an error while running ready function - ${e}`) 
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