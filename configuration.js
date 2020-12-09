const fs = require('fs')
const ejs = require('edit-json-file')

function getConfig(guildID) {
    if (fs.existsSync(`${__dirname}/../storage/guildconfigs/${guildID}.json`))
        return require(`../storage/guildconfigs/${guildID}.json`)
    else
        return require(`../storage/defaultconfig.json`)
}

async function setValue(guildID, name, value) {
    if (!fs.existsSync(`${__dirname}/../storage/guildconfigs/${guildID}.json`)) {
        fs.copyFileSync(`${__dirname}/../storage/defaultconfig.json`, `../storage/guildconfigs/${guildID}.json`);
    }

    let file = ejs(`${__dirname}/../storage/guildconfigs/${guildID}.json`, {autosave: true})
    file.set(name, value)
    return;
}

module.exports = {
    getConfig,
    setValue
}