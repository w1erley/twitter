import { Children, createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem('USER_OBJECT')));
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('');
        }, 5000)
    }

    const setUser = (user) => {
        _setUser(user)
        if (user) {
            localStorage.setItem('USER_OBJECT', JSON.stringify(user));
        }
        else {
            localStorage.removeItem('USER_OBJECT')
        }
    }

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }
        else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            notification,
            setUser,
            setToken,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
