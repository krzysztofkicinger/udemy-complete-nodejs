const fs = require('fs');
const _ = require('lodash');

const fileName = 'notes.txt';
const notes = new Map();

const initializeNotes = () => {
    fs.readFile(fileName, (error, data) => {
        const lines = _.split(_.toString(data), /\n/);
        lines.map(note => { id: _.uniqueId(), note }).forEach(note => notes.set(note.id, note.note));
    });
};

module.exports.listNotes = () => notes;

module.exports.addNote = (note) => {
    notes.set(_.uniqueId(), note);
    fs.appendFile(fileName, `\n${note}`, (error) => console.error(error));
};