const fs = require('fs');
const _ = require('lodash');

const FILE_NAME = 'notes-data.json';
const notes = new Map();

const addNote = (title, body) => {
    const createdNote = { title, body };
    const notes = listNotes();
    storeNotes(_.uniqBy(_.concat(createdNote, notes), 'title'));
    return createdNote;
};

const readNote = (title) => {
    return _.filter(listNotes(), { title })[0];
};

const removeNote = (title) => {
    const notes = listNotes();
    const filteredNotes = _.reject(notes, { title });
    storeNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

const listNotes = () => {
    const data = _.toString(loadNotes());
    return _.isEmpty(data) ? [] : JSON.parse(data);
};

const storeNotes = (notes) => {
    fs.writeFileSync(FILE_NAME, JSON.stringify(notes));
};

const loadNotes = () => {
    return fs.readFileSync(FILE_NAME);
};

module.exports = {
    addNote,
    readNote,
    removeNote,
    listNotes
};
