const os = require('os');
const fs = require('fs');
const notes = require('./notes');
const _ = require('lodash');

console.log('Starting app...');


const user = os.userInfo();
notes.addNote(`Hello ${user.username}`);

const result = notes.add(1, 2);
console.log(`Result: ${result}`);
console.log(`Is string: ${_.isString(result)}`);
console.log(`Create unique id: ${_.uniqueId()}`)

const filteredArray = _.uniq(['Chris', 1, 'Chris', 1, 4, 3]);
console.log(`Array: ${filteredArray}`);


// appendFile(fileName, `\nHello + ${user.username}`);

// function appendFile(file, text) {
//     fs.appendFile(file, text, function(error) {
//         if(error) {
//             console.log('Unable to write to file');
//         }
//     });
// }