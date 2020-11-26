const { classify } = require("./nsfw");
const { isImageURL } = require("../util/URLchecker");

async function onMessage(msg) {
    if (msg.author.bot)
        return;

    if (msg.channel.nsfw)
        return;

    let message = msg.content.split(' ');

    message.forEach(async (content) => {
        if (isImageURL(content))
        {
            let classification = await classify(content)
            for (let i = 0; i < classification.length; i++) {
                const c = classification[i];
                console.log(c);
                if (c.className == "Porn" || c.className == "Hentai" || c.className == "Sexy")
                    if (c.probability >= 0.65)
                        return msg.delete(), msg.reply('Please do not send NSFW content! `Was this a mistake? Please contact Waves#0550`');
            }
        }
    })

    msg.attachments.forEach(async (attachment) => {
        console.log(attachment)
        let classification = await classify(attachment.url)
        for (let i = 0; i < classification.length; i++) {
            const c = classification[i];
            console.log(c);
            if (c.className == "Porn" || c.className == "Hentai" || c.className == "Sexy")
                if (c.probability >= 0.65)
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