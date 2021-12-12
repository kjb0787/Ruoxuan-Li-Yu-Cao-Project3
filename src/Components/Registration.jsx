import axios from "axios";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { useNavigate } from 'react-router';

export default function Registration() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <form className="container">
                <div className="form-container">
                    <h1>Register</h1>
                    <li>
                        <label>
                            Username:
                        </label>
                        <input name="username" id="username" onChange={(e) => setUsername(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label>
                            Password:
                        </label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </li>
                    <button type="submit" className="button" onClick={() => {
                        axios.post('/api/user/register', { username: username, password: password })
                            .then(response => {
                                console.log(response)
                                navigate("/favorites")
                            })
                            .catch(error => console.log(error));
                    }}>Register</button>
                </div>
            </form>
        </div>


    );
}