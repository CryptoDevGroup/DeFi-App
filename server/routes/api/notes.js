const express = require('express');
const router = express.Router();

// In-memory store for notes
let notes = {};
let currentId = 1;

// POST /notes - Create a new note
router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const id = currentId++;
  notes[id] = { id, title, content };
  console.log('Created note:', notes[id]);
  res.status(201).json(notes[id]);
});

// GET /notes - Get all notes
router.get('/', (req, res) => {
  console.log('All notes:', Object.values(notes));
  res.json(Object.values(notes));
});

// GET /notes/:id - Get single note
router.get('/:id', (req, res) => {
  const note = notes[req.params.id];
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  console.log('Retrieved note:', note);
  res.json(note);
});

// PUT /notes/:id - Update note
router.put('/:id', (req, res) => {
  const { title, content } = req.body;
  if (!notes[req.params.id]) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes[req.params.id] = {
    ...notes[req.params.id],
    title: title || notes[req.params.id].title,
    content: content || notes[req.params.id].content
  };
  console.log('Updated note:', notes[req.params.id]);
  res.json(notes[req.params.id]);
});

// DELETE /notes/:id - Delete note
router.delete('/:id', (req, res) => {
  if (!notes[req.params.id]) {
    return res.status(404).json({ error: 'Note not found' });
  }
  console.log('Deleted note:', notes[req.params.id]);
  delete notes[req.params.id];
  res.status(204).end();
});

module.exports = router;