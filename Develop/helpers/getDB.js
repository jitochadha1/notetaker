const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const filePath = path.join(__dirname + '/../db/db.json');

const updateDB = (notes) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(notes), (err) => {
            resolve();
        });
    });
}

const getDB = () => {
    return new Promise((resolve, rej) => {
        fs.readFile(filePath, 'utf-8', (err, file) => {
            resolve(JSON.parse(file));
        });
    });
};

const addNote = (note) => {
    return new Promise(async (resolve, reject) => {
        note.id = uniqid();

        const notes = await getDB();
        notes.push(note);

        await updateDB(notes);

        resolve();
    });
};

const deleteNote = (id) => {
    return new Promise(async (resolve, reject) => {
        const notes = await getDB();

        const newNotes = notes.filter(note => note.id !== id);
        await updateDB(newNotes);
        resolve();
    });
}

module.exports = { getDB, addNote, deleteNote };