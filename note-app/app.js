const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes');

console.log('Starting app...');

const command = process.argv[2];
console.log(`Command: ${command}`);

switch(command) {
    case 'add':
        const note = process.argv[3];
        notes.addNote();
        break;
    case 'list': console.log(notes.listNotes()); break;
    default: console.log('Command not recognized');
}