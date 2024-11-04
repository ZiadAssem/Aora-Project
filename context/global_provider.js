import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        // check if user is logged in
        // if user is logged in, set user
        // else set user to null

         getCurrentUser()
            .then((res) => {
                if (res) {
                    setUser(res);
                    setisLoggedIn(true);
                }
                else{
                    setUser(null);
                    setisLoggedIn(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() =>
                setIsLoading(false)
            );
        setIsLoading(false);
    }, [])

    return (
        <GlobalContext.Provider value={{ isLoggedIn,setisLoggedIn, user, setUser, isLoading }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;