const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes');
const yargs = require('yargs');

console.log('Starting app...');

// console.log(`Yargs arguments: `, yargs.argv);
// console.log(`Process arguments: ${process.argv}`);

const argv = yargs.argv;
const command = argv['_'][0];

console.log('Command:', command);

switch(command) {
    case 'add':
        notes.addNote(argv.title, argv.body);
        break;
    case 'list':
        console.log(notes.listNotes());
        break;
    case 'read':
        console.log(notes.readNote(argv.title));
        break;
    case 'remove':
        notes.removeNote(argv.title);
        break;
    default:
        console.error('Command not recognized');
}