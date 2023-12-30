const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database("FoodWasteApp13.db"); // daca intampinam probleme cu POST, facem alt BD ( modificam numele bd-ului si apoi rulam iar node server.js )

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
  name TEXT NOT NULL,
  idUser INTEGER NOT NULL,
  tag TEXT NOT NULL,
  FOREIGN KEY (idUser) REFERENCES users(id)
  )
`);


// Cand cream o baza de date noua, comentam aceste 3 runuri de insert si abia dupa ce am pornit 
// serverul si s-a creat baza de date, oprim serverul, decomentam cele 3 runnuri de insert si 
// pornim iar serverul ca sa mearga, altfel eroare pentru ca runurile se apeleaza toate in acelasi
// timp in loc sa fie apelate pas cu pas, in ordinea codului. Totodata, dupa ce a mers prima
// inserare, trebuie iar comentate si iar pornit serverul pentru ca vom avea dubluri in tabela 
// users altfel...

// db.run(`
//     INSERT INTO users (username, password, phoneNumber) values ('teo', 'admin', '0741905759')
// `);

// db.run(`
//     INSERT INTO users (username, password, phoneNumber) values ('tibi', 'admin', '0742069690')
// `);

// db.run(`
//     INSERT INTO users (username, password, phoneNumber) values ('alex', 'admin', '0732924735')
// `);

app.post("/register", (req, res) => {
  const { username, password, phoneNumber } = req.body;

  // Check if any of the required fields are empty
  if (!username || !password || !phoneNumber) {
    return res.status(400).json({ error: "All fields must be filled out" });
  } else {
    // Check if the username already exists
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Registration failed" });
      }

      // If the username already exists, return an error
      if (row) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Insert the new user into the database
      db.run(
        "INSERT INTO users (username, password, phoneNumber) VALUES (?, ?, ?)",
        [username, password, phoneNumber],
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Registration failed" });
          }

          res.json({ message: "Registration successful" });
        }
      );
    });
  }
});

let idLoggedUser;
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match a user in the database
  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Login failed" });
      }
      // If a user with the provided username and password is found, login is successful
      if (row) {
        idLoggedUser = row.id;
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  );
});

app.get("/getFridgeItems", (req, res) => {
  db.all(
    "SELECT * FROM fridgeItems WHERE idUser = ?",
    [idLoggedUser],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get list of items" });
      } else {
        if (rows.length > 0) {
          const fridgeItemsList = rows.map((row) => {
            return {
              id: row.id,
              idUser: row.idUser,
              category: row.category,
              name: row.name,
              date: row.date,
              about: row.about,
              shareable: row.shareable,
            };
          });

          res.json({
            message: "Login successful",
            fridgeItems: fridgeItemsList,
          });
        } else {
          res.json({
            message: "Login successful",
            fridgeItems: [],
          });
        }
      }
    }
  );
});

app.get("/getFriends", (req, res) => {
  db.all(
    "SELECT * FROM friends WHERE idUser = ?",
    [idLoggedUser],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get list of friends" });
      } else {
        if (rows.length > 0) {
          const friendsList = rows.map((row) => {
            return {
              id: row.id,
              name: row.name,
              idUser: row.idUser,
              tag: row.tag,
            };
          });

          res.json({
            message: "Login successful",
            friends: friendsList,
          });
        } else {
          res.json({
            message: "Login successful",
            friends: [],
          });
        }
      }
    }
  );
});

app.post("/addFridgeItems", (req, res) => {
  const { option, name, date, about } = req.body;

  db.run(
    "INSERT INTO fridgeItems (idUser, category, name, date, about) VALUES (?, ?, ?, ?, ?)",
    [idLoggedUser, option, name, date, about],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to add FoodItem" });
      }

      res.json({ message: "Added foodItem succesfully" });
    }
  );
});

app.post("/addFriend", (req, res) => {
  const { name, category } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [name],
    (err1, row1) => {
      if(err1)
      {
        return res.status(500).json({ error: "Failed to get list of items" });
      }
      else
      {
        if(row1)
        {
          db.get(
            "SELECT * FROM friends WHERE name = ? AND idUser = ?",
            [name, idLoggedUser],
            (err2, row2) => {
              if(err2)
              {
                console.error(err2.message);
                return res.status(500).json({ error: "Failed to get list of items" });
              }
              else
              {
                if(!row2)
                {
                  db.run(
                    "INSERT INTO friends (idUser, name, tag) VALUES (?, ?, ?)",
                            [idLoggedUser, name, category],
                            (err3) => {
                        
                              if (err3) {
                                console.error(err3.message);
                        
                                return res.status(500).json({ error: "Failed to add friend"})
                              }
                        
                              res.json({ message: "Added friend succesfully"});
                            }
                  );
                }
                else
                {
                  console.error("Prietenul exista deja in tabela!");
                }
              }

            })
        }
        else
        {
          console.error("Utilizatorul nu exista!");
        }
      }
    }
    );
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
