import axios from "axios";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { useNavigate, useLocation } from 'react-router';


export default function SignIn() {
    const location = useLocation();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    });
    console.log(location.state);
    const originalPath = location.state ? location.state.path : '/';

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div className="form-container">
                <h1>Sign in</h1>
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
                    axios.post('/api/user/signin', userData)
                        .then(response => {
                            if (response.data.token) {
                                localStorage.setItem("username", JSON.stringify(response.data))
                            }
                            navigate(originalPath)
                        })
                        .catch(error => console.log(error));
                }}>Sign in</button>
            </div>
        </div>
    );
}