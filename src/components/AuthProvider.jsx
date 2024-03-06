import { createContext, useState, } from "react";

// create the Context
export const AuthContext = createContext();

// create component that will wrap our app, means all children can access the context using our hook
export const AuthProvider = (props) => {
    // using object for the state, this way we can add more properties later like ID.
    const [auth, setAuth] = useState({
        // initialse the context with token form local storage, this way if user refereshes the page, will still have token in memory
        token: window.localStorage.getItem("token"),
        user: JSON.parse(window.localStorage.getItem("user")),
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};

  //   useEffect(() => {
  //       const fetchUserDetails = async () => {
  //         const token = window.localStorage.getItem("token");
  //         if (token) {
  //           try {
  //             const decodedToken = JSON.parse(atob(token.split('.')[1]));
  //             const userId = decodedToken.user_id;
              
  //             const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
  //               headers: {
  //                 Authorization: `Token ${token}`,
  //               },
  //             });
    
  //             if (!response.ok) {
  //               // handle errors e.g. invalid token
  //               throw new Error('Error fetching user details');
  //             }
    
  //             const userDetails = await response.json();
  //             setAuth((prevAuth) => ({
  //               ...prevAuth,
  //               token,
  //               user: userDetails,
  //             }));
  //           } catch (error) {
  //             console.error("Error fetching user details:", error);
  //             // clear token if invalid
  //             window.localStorage.removeItem("token");
  //             setAuth({ token: null, user: null });
  //           }
  //         }
  //       };
        
  //       fetchUserDetails();
  // }, []);

