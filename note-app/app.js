const os = require('os');
const fs = require('fs');
const notes = require('./notes');

console.log('Starting app...');

const fileName = 'greetings.txt';
const user = os.userInfo();

appendFile(fileName, `\nHello + ${user.username}`);

function appendFile(file, text) {
    fs.appendFile(file, text, function(error) {
        if(error) {
            console.log('Unable to write to file');
        }
    });
}