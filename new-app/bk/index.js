const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/api/save', (req, res) => {
  const { name, hobby } = req.body;
  const sql = 'INSERT INTO users (name, hobby) VALUES (?, ?)';
  db.query(sql, [name, hobby], (err) => {
    if (err) return res.status(500).json({ message: 'Error saving data' });
    res.json({ message: 'Data saved successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

