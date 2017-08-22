const fs = require('fs');
const _ = require('lodash');

const fileName = 'notes.txt';
const notes = new Map();

// const initializeNotes = () => {
//     fs.readFile(fileName, (error, data) => {
//         const lines = _.split(_.toString(data), /\n/);
//         lines.map(note => ({ id: _.uniqueId(), note })).forEach(note => {
//             notes.set(note.id, note.note)
//         });
//     });
// };


const addNote = (title, body) => {
    console.log('Adding note', title, body);
};

const readNote = (title) => {
    console.log('Reading note', title, body);
};

const removeNote = (title) => {
    console.log('Removing note', title);
};

const listNotes = () => {
    console.log('Listing notes')
};



module.exports = {
    addNote,
    readNote,
    removeNote,
    listNotes
};
