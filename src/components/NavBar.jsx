import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault(); // prvents default link navigation
        window.localStorage.removeItem("token"); // removes auth token when user logs out
        // window.localStorage.removeItem("user_id"); 
        window.localStorage.removeItem("username"); 
        setAuth((prevAuth) => ({...prevAuth, token: null })); // clears state when user logs out
        navigate('/'); // navigates to home page post logout
    };

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                {auth.token ? (
                    // groups links without adding extra nodes to DOM
                    <>
                    <Link to="/projects/create">Create Project</Link>
                    <Link to="/" onClick={handleLogout}>Log Out</Link>
                    </>
                ) : (
                    <>
                    <Link to="/login">Login</Link>
                    <Link to="/users/register">Sign Up</Link>
                    {/* <Link to="/projects">Active Projects</Link> */}
                    </>
                )}
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;