const fs = require('fs')

function getConfig(guildID) {
    if (fs.exists(`../storage/guildconfigs/${guildID}.json`))
        return require(`../storage/guildconfigs/${guildID}.json`)
    else
        return require(`../storage/defaultconfig.json`)
}

function setValue(guildID, name, value) {
    let file = editJsonFile(`../storage/guildconfigs/${guildID}.json`, {autosave: true})
    file.set(name, value)
}

module.exports = {
    getConfig,
    setValue
}