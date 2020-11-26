require('colors')

const fs = require('fs')

const logfile = "log.txt"
// kinda bad code but who cares
function log(tolog, fileonly, timestamp) {

    const date = new Date();
    
    let message;
    let messagenocolor;

    if (timestamp || timestamp == null) {
        message = `[${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getSeconds().toString()}] `.magenta + tolog
        messagenocolor = `[${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getSeconds().toString()}] ` + tolog
    } else {
        message = tolog
        messagenocolor = tolog
    }
    
    if (!fileonly || fileonly == null) {
        console.log(message)
    }
    
    fs.appendFile(logfile, messagenocolor + '\n', function (err) {
        if (err) {
            log('Error while logging to file')
        }
    })
}  

module.exports = {
    log
}