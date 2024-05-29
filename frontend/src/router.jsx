import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    Navigate
  } from "react-router-dom";

import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx"
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import TweetPage from "./views/TweetPage.jsx";
import Profile from "./views/Profile.jsx";
import ProfileSettingsModal from "./components/modals/ProfileSettingsModal.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/tweet/:tweetId',
                element: <TweetPage/>
            },
            {
                path: '/settings/profile',
                element: <ProfileSettingsModal/>
            },
            {
                path: '/users/:userId',
                element: <Profile/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;
