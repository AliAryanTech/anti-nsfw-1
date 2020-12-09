const config = require("../commands/config");
const { getConfig } = require("../util/configuration");
const Discord = require("discord.js");

const commands = [
    config
]

async function onMessage(msg) {
    const config = getConfig(msg.guild.id)
    if (!msg.content.startsWith(config.prefix))
        return;

    const commandstring = msg.content.split(' ')[0].toLowerCase()

    for (let i = 0; i < commands.length; i++) {
        if (commandstring.substring(config.prefix.length) === commands[i].info.run) {
            if (!msg.member.hasPermission(commands[i].info.permissions)) {
                const embed = new Discord.MessageEmbed()
                    .setTitle('No permissions!')
                    .setDescription('You do not have permission to run that command (' + commands[i].info.permissions + ')')
                    .setColor('#b8232d')
                return msg.channel.send(embed)
            }
            commands[i].run(msg);
        }
    }
}

const info = {
    "name":"commands",
    "desc":"handles commands."
}

function onStart() {
    return;
}

function onReady() {
    return;
}

module.exports = {
    onMessage,
    onStart,
    onReady,
    info
}