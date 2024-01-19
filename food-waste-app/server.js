const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database("FoodWasteApp14.db"); // daca intampinam probleme cu POST, facem alt BD ( modificam numele bd-ului si apoi rulam iar node server.js )

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

db.run(`
    CREATE TABLE IF NOT EXISTS shareList (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idUser INTEGER NOT NULL,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    about TEXT NOT NULL,
    shareable BOOLEAN DEFAULT true,
    FOREIGN KEY (idUser) REFERENCES users(id)
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS friendsShareList (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idUser INTEGER NOT NULL,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    about TEXT NOT NULL,
    shareable BOOLEAN DEFAULT true,
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
const currentDate = new Date().toISOString().split("T")[0];

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

app.get("/getExpiringItems", (req, res) => {
  db.all(
    "SELECT * FROM fridgeItems WHERE idUser = ? AND date <= date(?, '+7 days')",
    [idLoggedUser, currentDate],
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get list of expiring items" });
      } else {
        if (rows.length > 0) {
          const expiringItems = rows.map((row) => {
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
            message: "Got list of expiring items",
            expiringItemsList: expiringItems,
          });
        } else {
          res.json({
            message: "Got list of expiring items",
            expiringItemsList: [],
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
        return res.status(500).json({ error: "Failed to add item" });
      }
      const newItem = {
        idUser: idLoggedUser,
        category: option,
        name: name,
        date: date,
        about: about,
        shareable: false,
      };
      res.json({ message: "Added item succesfully", item: newItem });
    }
  );
});

app.post("/addFriend", (req, res) => {
  const { name, category } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [name], (err1, row1) => {
    if (err1) {
      return res.status(500).json({ error: "Failed to get list of items" });
    } else {
      if (row1) {
        db.get(
          "SELECT * FROM friends WHERE name = ? AND idUser = ?",
          [name, idLoggedUser],
          (err2, row2) => {
            if (err2) {
              console.error(err2.message);
              return res
                .status(500)
                .json({ error: "Failed to get list of items" });
            } else {
              if (!row2) {
                db.run(
                  "INSERT INTO friends (idUser, name, tag) VALUES (?, ?, ?)",
                  [idLoggedUser, name, category],
                  (err3) => {
                    if (err3) {
                      console.error(err3.message);

                      return res
                        .status(500)
                        .json({ error: "Failed to add friend" });
                    }
                    const newFriend = {
                      name: name,
                      idUser: idLoggedUser,
                      tag: category,
                    };
                    res.json({
                      message: "Added friend succesfully",
                      friend: newFriend,
                    });
                  }
                );
              } else {
                console.error("Prietenul exista deja in tabela!");
              }
            }
          }
        );
      } else {
        console.error("Utilizatorul nu exista!");
      }
    }
  });
});

app.get("/getShareItems", (req, res) => {
  db.all(
    "SELECT * FROM shareList WHERE idUser = ?",
    [idLoggedUser],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get list of items" });
      } else {
        if (rows.length > 0) {
          const shareItemsList = rows.map((row) => {
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
            shareItems: shareItemsList,
          });
        } else {
          res.json({
            message: "Login successful",
            shareItems: [],
          });
        }
      }
    }
  );
});

app.get("/getSharedList", (req, res) => {
  const friendId = req.query.friendId;

  console.log("Received request to get shared list. ", req.body);

  db.get("SELECT * FROM friends WHERE id = ?", [friendId], (err1, row1) => {
    if (err1) {
      return res
        .status(500)
        .json({ error: "Failed to get friend from friends" });
    } else {
      if (row1) {
        const friendName = row1.name;
        db.get(
          "SELECT * FROM users WHERE username = ?",
          [friendName],
          (err2, row2) => {
            if (err2) {
              console.error(err2.message);
              return res
                .status(500)
                .json({ error: "Failed to get friend from users" });
            } else {
              if (row2) {
                const friendUserId = row2.id;
                db.all(
                  "SELECT * FROM shareList WHERE idUser = ? AND shareable = ?",
                  [friendUserId, true],
                  (err3, rows) => {
                    if (err3) {
                      return res
                        .status(500)
                        .json({ error: "Failed to get friend's shared list" });
                    } else {
                      if (rows.length > 0) {
                        const sharedItemsList = rows.map((row) => {
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
                          message: "Retrieved friend's shared list",
                          sharedItems: sharedItemsList,
                        });
                      } else {
                        res.json({
                          message: "Retrieved friend's shared list",
                          sharedItems: [],
                        });
                      }
                    }
                  }
                );
              } else {
                console.error("Error getting friend's shared list");
              }
            }
          }
        );
      } else {
        console.error("No friend with that id");
      }
    }
  });
});

app.post("/addShareItems", (req, res) => {
  const { category, name, date, about, shareable } = req.body;

  console.log("Received request to add shareable item:", req.body);

  //cel mai probail aici se pierde category-ul
  db.run(
    "INSERT INTO shareList (idUser, category, name, date, about, shareable) VALUES (?, ?, ?, ?, ?, ?)",
    [idLoggedUser, category, name, date, about, shareable],
    (err) => {
      if (err) {
        console.error("Failed to add item to shareList:", err.message);
        return res.status(500).json({ error: "Failed to add item" });
      }

      const newItem = {
        idUser: idLoggedUser,
        category: category,
        name: name,
        date: date,
        about: about,
        shareable: shareable,
      };
      console.log("Added item to shareList successfully");
      res.json({ message: "Added item successfully", item: newItem });
    }
  );
});

app.get("/getUserData", (req, res) => {
  const friendId = req.query.friendId;
  db.get("SELECT * FROM users WHERE id = ?", [friendId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get list of items" });
    } else {
      if (row) {
        const userData = {
          id: row.id,
          username: row.username,
          password: row.password,
          phoneNumber: row.phoneNumber,
        };

        res.json({
          message: "User data is here",
          userData: userData,
        });
      } else {
        res.json({
          message: "User data is here",
          userData: [],
        });
      }
    }
  });
});

app.delete("/deleteSharedItem/:itemId", (req, res) => {
  const itemId = req.params.itemId;

  db.run("DELETE FROM shareList WHERE id = ?", [itemId], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Failed to delete shared item" });
    }
    res.json({ message: "Shared item deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
