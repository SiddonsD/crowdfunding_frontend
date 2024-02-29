import {createContext, useState, useEffect } from "react";

// create the Context
export const AuthContext = createContext();

// create component that will wrap our app, means all children can access the context using our hook
export const AuthProvider = (props) => {
    // using object for the state, this way we can add more properties later like ID.
    const [auth, setAuth] = useState({
        // initialse the context with token form local storage, this way if user refereshes the page, will still have token in memory
        token: window.localStorage.getItem("token"),
    });

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            setAuth((prevAuth) => ({...prevAuth, token}));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};