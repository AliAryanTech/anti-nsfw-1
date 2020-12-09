const { classify } = require("./nsfw");
const { isImage } = require("../util/URLchecker");
const { log } = require('../util/logging');
const { getConfig } = require('../util/configuration');
const { client } = require("..");
async function onMessage(msg) {
    if (msg.author.bot)
        return;

    if (msg.channel.nsfw)
        return;

    // if (msg.mentions.first.id == client.user.id)
    //     return msg.channel.send('Noticed ya pinged me, My prefix is ' + getConfig(msg.guild.id).prefix)

    let message = msg.content.split(' ')

    message.forEach(async (content) => {
        if (isImage(content))
        {
            let classification = await classify(content)
            for (let i = 0; i < classification.length; i++) {
                const c = classification[i]
                if (c.className == "Porn" || c.className == "Hentai" || c.className == "Sexy")
                    if (c.probability >= getConfig(msg.guild.id).probability)
                        return msg.delete(), msg.reply('Please do not send NSFW content! `Was this a mistake? Please contact Waves#0550`');
            }
        }
    })

    msg.attachments.forEach(async (attachment) => {
        log(attachment)
        let classification = await classify(attachment.url)
        if (!isImage(attachment.url))
            return;
        for (let i = 0; i < classification.length; i++) {
            const c = classification[i];
            if (c.className == "Porn" || c.className == "Hentai" || c.className == "Sexy")
                if (c.probability >= getConfig(msg.guild.id).probability)
                    return msg.delete(), msg.reply('Please do not send NSFW content! `Was this a mistake? Please contact Waves#0550`');
        }
    })

    return;
}

const info = {
    "name":"message",
    "desc":"handles messages."
}

function onStart() {
    return;
}

function onReady() {
    return;
}

module.exports = {
    onMessage,
    onReady,
    onStart,
    info
}