// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo_no_bg.png";
import AddFoodItem from "./addFoodItem/addFoodItem";
import AddFriend from "./addFriend/addFriend";
import LoginSignup from "./loginSignup/loginSignup";
import axios from "axios";

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

  const handleAddFoodItem = async (newItem) => {
    setFridgeItemsList([...fridgeItems, newItem]);
  };

  const [fridgeItems, setFridgeItemsList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getFridgeItems")
      .then((response) => {
        const { fridgeItems: fetchedFridgeItems } = response.data;
        setFridgeItemsList(fetchedFridgeItems);
      })
      .catch((error) => {
        console.error("Error fetching fridge items: ", error.message);
      });
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div>
          <img src={logo} id="logo" />
        </div>
        <div className="welcome">
          Welcome to your favourite Anti Food Waste App
        </div>
        <div className="username">User: {username}</div>
      </nav>

      <div className="content">
        <div className="Fridge">
          <h2 id="fridge-list-header">Fridge List</h2>
          <button id="add_item" onClick={handleFridgeButtonClick}>
            Adaugă aliment
          </button>
          {showAddFoodItem && <AddFoodItem onAddFoodItem={handleAddFoodItem} />}
          <ul id="Fridge_List">
            {fridgeItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.category} - {item.date} - {item.about}
              </li>
            ))}
          </ul>
        </div>

        <div className="Shareable">
          <h2 id="sharable-list-header">Sharable List</h2>
          <ul id="Sharable_List">
            <li>Item 1</li>
          </ul>
        </div>

        <div className="Friends">
          <h2 id="friends-list-header">Friends List</h2>
          <button id="add_item" onClick={handleFriendButtonClick}>
            Adaugă prieten
          </button>
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
