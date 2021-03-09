const path = require('path');
const express = require('express');
const app = express();
const { getDB, addNote, deleteNote } = require('./helpers/getDB');

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());

// Get notes
app.get('/api/notes', async (req, res) => {
    const notes = await getDB();
    res.json(notes);
});

// Add note
app.post('/api/notes', async (req, res) => {
    const { text, title } = req.body;
    const note = { text, title };

    await addNote(note);

    res.send('ok');
});

// Delete note
app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;

    await deleteNote(id);

    res.json({ success: true });
});

// Notes page (if .html ext is missing)
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

// Start server
app.listen(80, () => {
    console.log('Listening to port 80')
});