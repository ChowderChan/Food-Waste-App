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

  const handleAddFriend = async (newFriend) => {
    setFriendsList([...friendsList, newFriend]);
  };

  const [fridgeItems, setFridgeItemsList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/getFriends")
      .then((response) => {
        const { friendsList: fetchedFriends } = response.data;
        setFriendsList(fetchedFriends);
        console.log(fetchedFriends);
      })
      .catch((error) => {
        console.error("Error fetching friends list: ", error.message);
      });
  }, []);

  const handleShareButtonClick = async (item) => {
    try {
      // Add the shared item to the shareList table
      await axios.post("http://localhost:5000/addShareItems", {
        //idUser: item.idUser,
        category: item.category,
        name: item.name,
        date: item.date,
        about: item.about,
        shareable: true,
      });

      console.log("Category before API call:", item.category);
      console.log("Category before API call:", item.name);

      // Remove the shared item from the fridgeItems table
      // await axios.post(
      //   "http://localhost:5000/removeFridgeItem",
      //   {
      //     itemId: item.id,
      //   }
      // );

      // Update the client-side state to reflect the changes
      // setFridgeItemsList((prevFridgeItems) =>
      //   prevFridgeItems.filter((fridgeItem) => fridgeItem.id !== item.id)
      // );

      setShareItemsList((prevShareItems) => [
        ...prevShareItems,
        {
          idUser: item.idUser,
          category: item.category,
          name: item.name,
          date: item.date,
          about: item.about,
          shareable: true,
        },
      ]);
    } catch (error) {
      console.error("Action failed", error.message);
    }
  };

  const [shareItems, setShareItemsList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getShareItems")
      .then((response) => {
        const { shareItems: fetchedShareItems } = response.data;
        setShareItemsList(fetchedShareItems);
      })
      .catch((error) => {
        console.error("Error fetching fridge items: ", error.message);
      });
  }, []);

  const shareSpan = document.createElement("span");
  shareSpan.innerHTML = "share";

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
            {fridgeItems &&
              fridgeItems.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.category} - {item.date} - {item.about}{" "}
                  <span onClick={() => handleShareButtonClick(item)}>
                    share
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="Shareable">
          <h2 id="sharable-list-header">Shareable List</h2>
          <ul id="Sharable_List">
            {shareItems &&
              shareItems.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.category} - {item.date} - {item.about}
                </li>
              ))}
          </ul>
        </div>

        <div className="Friends">
          <h2 id="friends-list-header">Friends List</h2>
          <button id="add_item" onClick={handleFriendButtonClick}>
            Adaugă prieten
          </button>
          {showAddFriend && <AddFriend onAddFriend={handleAddFriend} />}
          <ul id="Friend_List">
            {friendsList &&
              friendsList.map((friend) => (
                <li key={friend.id}>
                  {friend.name} - {friend.tag}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
