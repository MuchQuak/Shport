import './style/app.scss';
import React, {useEffect, useState} from "react";
import {Route, Routes} from 'react-router-dom';
import NavBar from './dashboard/NavBar';
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import About from "./dashboard/about/About";
import {getPrefs} from "./login-signup/UserHandler";

/*
const user = {
    info: {
        name: "",
    },
    prefs: {} // prefs object
}
*/

export default function App() {
    const [user, setUser] = useState({});
    // change to auth token once implemented
    const auth_token = "not_yet_implemented";
    // change to username retrieval using token
    const username = "Guest"
    useEffect(() => {
        getPrefs(auth_token).then(p => {
            const temp = {
                info: {
                    name: username,
                },
                prefs: p
            }
            setUser(temp);
        });
    }, [] );

    return (
        <>
            <NavBar/>
            <Routes>
                <Route index element={<Dashboard user={user}/>} />
                <Route path="settings" element={<Settings user={user} setUser={setUser}/>} />
                <Route path="about" element={<About/>} />
            </Routes>
        </>
    );
}