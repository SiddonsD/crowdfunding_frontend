import { useState } from "react";

import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login";
import useAuth from "../hooks/use-auth.js";

function LoginForm() {
    const navigate = useNavigate();
    const {setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            try {
                const response = await postLogin(
                    credentials.username, 
                    credentials.password
                );
                window.localStorage.setItem("token", response.token);
                setAuth((prevAuth) => ({
                    ...prevAuth, 
                    token: response.token
                })
                ); // update auth state
                navigate("/"); // navigate home
            } catch (err) {
                window.alert(err.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                type="text" 
                id="username" 
                placeholder="Enter username"
                value={credentials.username}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                type="password" 
                id="password" 
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;