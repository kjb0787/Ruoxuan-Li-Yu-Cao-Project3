import axios from "axios";
import React, { useState } from "react";
import { Navigation } from "./Navigation";
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import Button from 'react-bootstrap/Button'
import "./Container.css"


export default function Registration() {
    const navigate = useNavigate();
    const location = useLocation();

    const originalPath = location.state.path;
    console.log(originalPath);

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    });
    const [errorMsg, setErrorMsg] = useState("");

    function displayErrorMsg() {
        if (errorMsg.length > 0) {
            return (<div className="alert alert-warning">
                {errorMsg}
            </div>);
        }
    }

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div className="inputContainer">
                {displayErrorMsg()}
                <h1>Register</h1>
                <h5>
                    Username:
                </h5>
                <input name="username" id="username" onChange={(e) => {
                    const username = e.target.value;
                    setUserData({
                        ...userData,
                        username: username
                    });

                }} />
                <h5>
                    Password:
                </h5>
                <input type="password" id="password" onChange={(e) => {
                    const password = e.target.value;
                    setUserData({
                        ...userData,
                        password: password
                    })
                }} required />
                <div>
                    <Button className="button" onClick={() => {
                        axios.post('/api/user/register', userData)
                            .then(response => {
                                navigate(originalPath);
                                console.log(response);
                            })
                            .catch(error => { setErrorMsg(error.response.data); console.log(error) });
                    }}>Register</Button>
                </div>
            </div>
        </div>
    );
}