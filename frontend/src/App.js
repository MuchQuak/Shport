import './style/app.scss';
import React, {useState} from "react";
import {Route, Routes} from 'react-router-dom';
import NavBar from './dashboard/NavBar';
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import About from "./dashboard/about/About";
import {prefsQuery} from "./login-signup/UserHandler";
import {useQuery} from "react-query";


const user = {
    info: {
        name: "",
    },
    prefs: {} // prefs object
}

export default function App(props) {
    const [user, setUser] = useState({});

    // change to auth token once implemented
    const auth_token = props.cookies.auth_token;
    // change to username retrieval using token
    const username = "Guest";
    const { isLoading, isError, error } = useQuery(['prefs', auth_token], () => prefsQuery(auth_token), {
        onSuccess: (data) => {
            const temp = {
                info: {
                    name: username,
                },
                auth_token: props.cookies.auth_token,
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