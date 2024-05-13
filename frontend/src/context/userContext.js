import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    useEffect(() => {
        const userFromStorage = JSON.parse(localStorage.getItem('user'));
        const tokenFromCookie = Cookies.get('token');
        
        if (!userFromStorage || !tokenFromCookie) {
            // Redirect to the login page if user data or token is not available
            navigate('/login');
        } else {
            setCurrentUser(userFromStorage);
        }

        // const handleBeforeUnload = (event) => {
        //     // Remove user data from localStorage and token from cookies
        //     localStorage.removeItem('user');
        //     Cookies.remove('token');
            
        //     // Prompt the user to reload the page with a confirmation message
        //     event.preventDefault();
        //     event.returnValue = '';
        // };

        // Add event listener for beforeunload event
        // window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup: Remove event listener when component unmounts
        // return () => {
        //     window.removeEventListener('beforeunload', handleBeforeUnload);
        // };
    }, [navigate]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    const logout = () => {
        // Clear localStorage and cookies
        localStorage.removeItem('user');
        Cookies.remove('token');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}> 
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
