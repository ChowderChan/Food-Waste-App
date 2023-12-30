// App.js
import React, { useState } from "react";
import "./App.css";
import logo from "./logo_no_bg.png";
import AddFoodItem from "./addFoodItem/addFoodItem";
import AddFriend from "./addFriend/addFriend";

import { useParams } from "react-router-dom";

function App() {
  // Use the useParams hook to get access to the route parameters
  const { username } = useParams();

  const [showAddFoodItem, setShowAddFoodItem] = useState(false);
  const handleFridgeButtonClick = () => {
    setShowAddFoodItem(!showAddFoodItem);
  };

  const [showAddFriend, setShowFriend] = useState(false);
  const handleFriendButtonClick = () => {
    setShowFriend(!showAddFriend);
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
          
            User: {username}
          
        </div>
      </nav>

      <div className="content">

        <div className="Fridge">
          <h2 id="fridge-list-header">
              Fridge List
          </h2>
          <button id="add_item" onClick={handleFridgeButtonClick}>
              Adaugă aliment
          </button>
          {showAddFoodItem && <AddFoodItem />}
          <ul id="Fridge_List">
            <li>Item 1</li>
          </ul>
        </div>

        <div className="Shareable">
          <h2 id="sharable-list-header">
              Sharable List
          </h2>
          <ul id="Sharable_List">
            <li>Item 1</li>
          </ul>
        </div>

        <div className="Friends">
          <h2 id="friends-list-header">
              Friends List
          </h2>
          <button id="add_item" onClick={handleFriendButtonClick}>Adaugă prieten</button>
          {showAddFriend && <AddFriend />}
          <ul id="Friend_List">
            <li>Item 1</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;