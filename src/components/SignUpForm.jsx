import { useState } from 'react';
import post from '../api/post-sign-up';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    // hook to redirect on successful registration
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        first_name: "",
        last_name: "",
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
            const response = await post(credentials.username, credentials.first_name, credentials.last_name, credentials.email, credentials.password);
            // auth token stored on local if registration successful
            window.localStorage.setItem('token', response.token);
            // redirect to homepage after registration or account/profile page (once created)
            navigate('/homepage')
       
        } catch (error) {
            // console.error('An error occured:', error.message);
            // if (error instanceof Response) {
            //     const errorData = await error.json();
            //     if (errorData.username) {
            //         console.error('User with this username already exists.');
            //     } else if (errorData.email) {
            //         console.error('User with this email already exists.');
            //     } else {
            //         console.error('An unknown error has occured:', errorData);
            //     }
            // }
            const errorData = error.response ? await error.response.json() : null;

            if (errorData) {
                // if username already exists
                if (errorData.username) {
                    console.error('User with this username already exists.');
                // if email already exists
                } else if (errorData.email) {
                    console.error('User with this email already exists.');
                // all other errors
                } else {
                    console.error('An unknown error has occurred.')
                }
            } else {
                console.error('An error occured but no additional information is available.');
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
                <label htmlFor="first_name">First Name:</label>
                <input 
                type="text" 
                id="first_name" 
                placeholder="First Name"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input 
                type="text" 
                id="last_name" 
                placeholder="Last Name"
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
            <button type="submit">Sign Up</button>
        </form>
    );

export default SignUpForm;