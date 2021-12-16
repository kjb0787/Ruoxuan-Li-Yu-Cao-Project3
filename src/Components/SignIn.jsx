import axios from "axios";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { useNavigate } from 'react-router';

export default function SignIn() {
    // const location = useLocation();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    });
    // console.log(location.state);
    // const originalPath = location.state ? location.state.path : '/';

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
            <div className="container">
                {displayErrorMsg()}
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
                <div></div>
                <button onClick={() => {
                    axios.post('/api/user/signin', userData)
                        .then(response => {
                            if (response.data.token) {
                                localStorage.setItem("loggedIn", JSON.stringify(userData.username));
                                localStorage.setItem("username", JSON.stringify(response.data));
                            }
                            console.log(response.data);
                            navigate('/')
                        })
                        .catch(error => { setErrorMsg(error.response.data); console.log(error) });
                }}>Sign in</button>
            </div>
        </div>
    );
}