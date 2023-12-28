// App.js
import React from 'react';
import './App.css';
import logo from './logo_no_bg.png'
import LoginSignup from './loginSignup/loginSignup';
import AddFoodItem from './addFoodItem/addFoodItem';


function App() {
  return (
    <div className="App">
      {/* <div>
        <LoginSignup/>
      </div> */}
      {/* <div>
        <AddFoodItem/>
      </div> */}
      <nav className="navbar">
        <div>
          <img src={logo} id='logo'/>
        </div>
        <div className='welcome'>
          Welcome to your favourite Anti Food Waste App
        </div>
        <div className='username'>
          <ul>
            <li>User: [Username]</li>
          </ul>
        </div>
      </nav>
      <div className='content'>
        <h2 id='fridge-list-header'>Fridge List<button id='add_item'>Adaugă aliment</button></h2>
        <div>
          <ul id='Fridge_List'>
            <li>Item 1</li>
          </ul>
        </div>
        <h2 id='sharable-list-header'>Sharable List<button id='add_item'>Adaugă aliment</button></h2>
        <div>
          <ul id='Sharable_List'>
            <li>Item 1</li>
          </ul>
        </div>
        <h2 id='friends-list-header'>Friends List<button id='add_item'>Adaugă prieten</button></h2>
        <div>
          <ul id='Friend_List'>
            <li>Item 1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;