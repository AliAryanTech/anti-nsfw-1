const { classify } = require("./nsfw");

async function onMessage(msg) {
    if (msg.author.bot)
        return;
    msg.attachments.forEach(async (attachment) => {
        console.log(attachment)
        msg.channel.send(`\`\`\`json\n${await JSON.stringify(await classify(attachment.url))}\n\`\`\``);
    });
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