const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const getDB = (callback) => {
    fs.readFile('./db/db.json', 'utf-8', (err, file) => {
        callback(JSON.parse(file));
    });
};

app.get('/api/notes', (req, res) => {
    getDB(db => res.json(db));
});

app.post('/api/notes', (req, res) => {
    const id = uniqid();
    const { text, title } = req.body;

    getDB(db => {
        const note = { id, text, title };
        db.push(note);
        const notes = JSON.stringify(db);
        fs.writeFile('./db/db.json', notes, (err) => {
            res.send('ok');
        });
    });
});

app.put('/api/notes/:id');

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(80, () => {
    console.log('Listening to port 80')
});