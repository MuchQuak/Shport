import './style/app.scss';
import React, {useEffect, useState} from "react";
import {Route, Routes} from 'react-router-dom';
import NavBar from './dashboard/NavBar';
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import About from "./dashboard/about/About";
import {prefsQuery} from "./login-signup/UserHandler";
import {useQuery} from "react-query";
import {sportsQuery} from "./dashboard/sport/SportHandler";
import {getAllTeamsFollowed, getSportsFollowed} from "./settings/PrefHandler";

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
    const { isLoading, isError, error } = useQuery(['prefs', auth_token], () => prefsQuery(auth_token), {
        onSuccess: (data) => {
            const temp = {
                info: {
                    name: username,
                },
                prefs: data
            }
            setUser(temp);
        }
    });

    if (isLoading) {
        return <span>App loading...</span>;
    } else if (isError) {
        return <span>App error: {error}...</span>;
    }

    return (
        <>
            <NavBar user={user}/>
            <Routes>
                <Route index element={<Dashboard user={user}/>} />
                <Route path="settings" element={<Settings user={user} setUser={setUser}/>} />
                <Route path="about" element={<About/>} />
            </Routes>
        </>
    );
}