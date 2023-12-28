import React, { useState } from "react";
import './loginSignup.css'
import userIcon from '../assets/person.png'
import passwordIcon from '../assets/password.png'

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up")

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underLine"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={userIcon} alt="" />
                    <input type="text" placeholder="Name" />
                </div>
                <div className="input">
                    <img src={passwordIcon} alt="" />
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
           
            {action==="Sign Up"?<div></div>: <div className="forgotPassword">Forgot password?</div>}
            <div className="submitContainer">
                <div className={action==="Login"?"submit gray":"submit"}
                onClick={() => {setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"}
                onClick={() => {setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignup