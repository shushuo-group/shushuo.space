const fs = require('fs')
const os = require("os");
const time = new Date()

//err
function logerr(data) {
    fs.appendFile('logs/errLogs.txt', time + os.EOL + __filename + os.EOL + data + os.EOL + os.EOL, (err) => {})
}
//see
function logsee(data) {
    fs.appendFile('logs/successLogs.txt', time + os.EOL + __filename + os.EOL + data + os.EOL + os.EOL, (err) => {})
}
module.exports = {
    logerr,
    logsee
}