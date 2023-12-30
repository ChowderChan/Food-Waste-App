const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('FoodWasteApp6.db'); // daca intampinam probleme cu POST, facem alt BD ( modificam numele bd-ului si apoi rulam iar node server.js )

// Assuming you have a 'users' table in the database with columns 'id', 'username', and 'password'

// Create the users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    phoneNumber TEXT NOT NULL
  )
`);

db.run(`
CREATE TABLE IF NOT EXISTS fridgeItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  idUser INTEGER NOT NULL,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  about TEXT NOT NULL,
  shareable BOOLEAN DEFAULT false,
  FOREIGN KEY (idUser) REFERENCES users(id)
  )
`);

db.run(`
CREATE TABLE IF NOT EXISTS friends (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  idUser INTEGER NOT NULL,
  tag TEXT NOT NULL,
  FOREIGN KEY (idUser) REFERENCES users(id)
  )
`);

app.post('/register', (req, res) => {
  const { username, password, phoneNumber } = req.body;

  // Check if any of the required fields are empty
  if (!username || !password || !phoneNumber) 
  {
    return res.status(400).json({ error: 'All fields must be filled out' });
  }
  else
  {
    // Check if the username already exists
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Registration failed' });
      }

      // If the username already exists, return an error
      if (row) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Insert the new user into the database
      db.run('INSERT INTO users (username, password, phoneNumber) VALUES (?, ?, ?)', [username, password, phoneNumber], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Registration failed' });
        }

        res.json({ message: 'Registration successful' });
      });
  });
  }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password match a user in the database
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' });
      }
  
      // If a user with the provided username and password is found, login is successful
      if (row) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/addFridgeItems', (req, res) => {
  const { option, name, date, about } = req.body;

  db.run('INSERT INTO users (username, password, phoneNumber) VALUES (?, ?, ?, ?)', [option, name, date, about], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Registration failed' });
    }

    res.json({ message: 'Registration successful' });
  });
});