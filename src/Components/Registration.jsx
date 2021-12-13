import axios from "axios";
import React, { useState } from "react";
import { Navigation } from "./Navigation";
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

export default function Registration() {
    const navigate = useNavigate();
    const location = useLocation();

    const originalPath = location.state.path;
    console.log(originalPath);

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    });

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div className="form-container">
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
                }} />
                <button onClick={() => {
                    axios.post('/api/user/register', userData)
                        .then(response => {
                            navigate(originalPath);
                            console.log("lol");
                            console.log(response);
                        })
                        .catch(error => console.log(error));
                }}>Register</button>
            </div>
        </div>
    );
}

 /* <form className="container">
            // TODO: why li cannot work
                <div className="form-container">
                    <h1>Register</h1>
                    <li>
                        <label>
                            Username:
                        </label>
                        <input name="username" id="username" onChange={(e) => {
                            const username = e.target.value;
                            setUserData({
                                ...userData,
                                username: username
                            });

                        }} />
                    </li>
                    <li>
                        <label>
                            Password:
                        </label>
                        <input type="password" id="password" onChange={(e) => {
                            const password = e.target.value;
                            setUserData({
                                ...userData,
                                password: password
                            })
                        }} />
                    </li>
                    <button onClick={() => {
                        axios.post('/api/user/register', userData)
                            .then(response => {
                                navigate("/favorites");
                                console.log("lol");
                                console.log(response);
                            })
                            .catch(error => console.log(error));
                    }}>Register</button>
                </div>
            </form> */