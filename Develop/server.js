const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, file) => {
        res.json(JSON.parse(file));
    });
});
app.post('/api/notes', (req, res) => {
    const id = uniqid();
    const { text, title } = req.body;

    console.log(id, text, title)

    fs.readFile('db/db.json', 'utf-8', (err, file) => {

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