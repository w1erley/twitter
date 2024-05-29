import React, {Suspense} from 'react';

import router from "./router";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx"
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import TweetPage from "./views/TweetPage.jsx";
import Profile from "./views/Profile.jsx";
import ProfileSettingsModal from "./components/modals/ProfileSettingsModal.jsx";

export default function App() {
   return (
    <Suspense fallback={<div>Loading . . .</div>}>
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<DefaultLayout/>}
                >
                    <Route index element={<Navigate to="/dashboard"/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/tweet/:tweetId" element={<TweetPage/>} />
                    <Route path="/settings/profile" element={<ProfileSettingsModal/>} />
                    <Route path="/users/:userId" element={<Profile/>} />
                </Route>
                <Route
                    path="/"
                    element={<GuestLayout/>}
                >
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<Signup/>} />
                </Route>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </Router>
    </Suspense>
   );
}
