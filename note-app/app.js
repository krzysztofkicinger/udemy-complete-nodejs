const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes');
const yargs = require('yargs');

console.log('Starting app...');

// console.log(`Yargs arguments: `, yargs.argv);
// console.log(`Process arguments: ${process.argv}`);

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'The body of the node',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all nodes')
    .command('read', 'Read individual node', {
        title: titleOptions,
    })
    .command('remove', 'Removes individual node', {
        title: titleOptions,
    })
    .help()
    .argv;

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