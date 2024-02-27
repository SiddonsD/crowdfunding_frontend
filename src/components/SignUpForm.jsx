import { useState } from 'react';
import postSignUp from '../api/post-sign-up';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    // hook to redirect on successful registration
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
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
        try {
            const response = await postSignUp(credentials);
            // auth token stored on local if registration successful
            window.localStorage.setItem('token', response.token);
            // redirect to homepage after registration or account/profile page (once created)
            navigate('/homepage')
       
        } catch (error) {
            // if username already exists
            if (error.message.includes('username')) {
                console.error('User with this username already exists.');
            }
            // if email already exists
            else if (error.message.includes('email')) {
                console.error('User with this email already exists.');
            } 
            // all other errors
            else {
            console.error(error.message)
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
                placeholder="Username"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                type="email" 
                id="email" 
                placeholder="Email"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                type="password" 
                id="password" 
                placeholder="Password"
                onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>
    );
}

export default SignUpForm;