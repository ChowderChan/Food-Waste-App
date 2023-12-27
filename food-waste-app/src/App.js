import logo from "./logo.svg";
import "./App.css";

import express from "express";
import cors from "cors";
import { sequelize } from "./sequelize.js";
import { moviesRouter } from "./Routers/moviesRouter.js";

const app = express();
app.use(express.json()); // The express.json() function is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", moviesRouter);

app.listen(5010, async () => {
  console.log("Express web server running on port 5010");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established!");
  } catch (err) {
    console.err("Unable to connect to the database!", err);
  }
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
