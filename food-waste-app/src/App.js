// App.js
import React, { useState } from "react";
import "./App.css";
import logo from "./logo_no_bg.png";
import LoginSignup from "./loginSignup/loginSignup";
import AddFoodItem from "./addFoodItem/addFoodItem";

import { useParams } from "react-router-dom";

function App() {
  // Use the useParams hook to get access to the route parameters
  const { username } = useParams();

  const [showAddFoodItem, setShowAddFoodItem] = useState(false);
  const handleFridgeButtonClick = () => {
    setShowAddFoodItem(!showAddFoodItem);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div>
          <img src={logo} id="logo" />
        </div>
        <div className="welcome">
          Welcome to your favourite Anti Food Waste App
        </div>
        <div className="username">
          <ul>
            <li>User: {username}</li>
          </ul>
        </div>
      </nav>
      <div className="content">
        <h2 id="fridge-list-header">
          Fridge List
          <button id="add_item" onClick={handleFridgeButtonClick}>
            Adaugă aliment
          </button>
          {showAddFoodItem && <AddFoodItem />}
        </h2>
        <div>
          <ul id="Fridge_List">
            <li>Item 1</li>
          </ul>
        </div>
        <h2 id="sharable-list-header">
          Sharable List<button id="add_item">Adaugă aliment</button>
        </h2>
        <div>
          <ul id="Sharable_List">
            <li>Item 1</li>
          </ul>
        </div>
        <h2 id="friends-list-header">
          Friends List<button id="add_item">Adaugă prieten</button>
        </h2>
        <div>
          <ul id="Friend_List">
            <li>Item 1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
