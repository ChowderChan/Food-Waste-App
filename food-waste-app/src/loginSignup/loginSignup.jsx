import React, { useState } from "react";
import './loginSignup.css'
import userIcon from '../assets/person.png'
import passwordIcon from '../assets/password.png'
import phoneIcon from '../assets/email.png'
import axios from 'axios'
// router
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up")
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Use the useNavigate function to get access to the navigation function
  const navigate = useNavigate();  // Replace useHistory with useNavigate

    const handleAction = async () => {
        try {
            if (action === 'Sign Up') {
                // Make a POST request to the server endpoint for registration
                const response = await axios.post('http://localhost:5000/register', {
                    username,
                    password,
                    phoneNumber,
                });

                console.log(response.data); // Assuming your server returns a response

                // Handle successful registration, e.g., redirect to login page or show a success message
            } else {
                // Make a POST request to the server endpoint for login
                const response = await axios.post('http://localhost:5000/login', {
                    username,
                    password,
                });

                console.log(response.data); // Assuming your server returns a response

                // Handle successful login, e.g., redirect to the home page or show a success message
                // Redirect to the main page (App.js) with the username parameter
                navigate(`/app/${username}`);
                
            }
        } catch (error) {
            console.error('Action failed', error.message);
            // Handle action failure, e.g., show an error message
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underLine"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={userIcon} alt="" />
                    <input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input">
                    <img src={passwordIcon} alt="" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {action==="Login"?<div></div>: <div className="input">
                    <img src={phoneIcon} alt="" />
                    <input type="password" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>}
            </div>
            {action==="Sign Up"?<div></div>: <div className="forgotPassword">Forgot password?</div>}
            <div className="submitContainer">
                <div className={action==="Login"?"submit gray":"submit"}
                onClick={() => {
                    setAction("Sign Up");
                    handleAction();
                }}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"}
                onClick={() => {
                    setAction("Login");
                    handleAction();
                }}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignup