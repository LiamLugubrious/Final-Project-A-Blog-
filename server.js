require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database');
    }
});

// Get all posts
app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch posts' });
        res.json(results);
    });
});

// Serve the edit page
app.get('/edit', (req, res) => {
    res.sendFile(__dirname + '/public/edit.html');
});

// Create a new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
    db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to create post' });
        res.status(201).json({ message: 'Post created' });
    });
});

// Update a post
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
    db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update post' });
        res.json({ message: 'Post updated' });
    });
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.json({ message: 'Post deleted' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
