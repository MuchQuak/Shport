import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchSports, getLabels} from "./SportHandler";
import {prefSize} from "./PrefHandler";
import {addUser} from "./UserHandler";

export default function LeaguePreferenceSelector(props) {
    const [sports, setSports] = useState([]);
    const [preferences, setPreferences] = useState({sports: {}});
    const location = useLocation();
    const prefs = () => {
        return props.prefs ? props.prefs : {sports: {}}
    }
    useEffect(() => {
        fetchSports().then(result => {
            if (result)
                setSports(result);
        });
    }, [] );
    if (!props || !sports || sports.length === 0) {
        return null;
    }
    function handleSubmit(event) {
        event.preventDefault();

        // To prevent going to this page without signing up first..?
        if (location.state === undefined || location.state === null ||
            location.state.username === undefined || location.state.username === "" || location.state.username === null ||
            location.state.password === undefined || location.state.password === "" || location.state.password === null ||
            location.state.email === undefined || location.state.email === "" || location.state.email === null){
            //navigate('/SignUp', {replace:true});
            return;
        }
        let newUser = {
            "username": location.state.username,
            "password": location.state.password,
            "email": location.state.email,
            "prefs": preferences
        }
        if (prefSize(prefs) === 0){ // User has no preferences
            let allSports = {};
            sports.forEach(element => {
                allSports[element.sport] = {};
            });
            if (document.getElementById("0").checked === true ){ // "No Preferences" clicked
                allSports.following = true;
                newUser.prefs.sports = allSports;
                addUser(newUser).then(response => {
                    if (response.status === 201) {
                        //navigate('/', {replace:true, state: {"username": location.state.username}});
                    } else {
                        console.log("Error " + String(response.status) + " could not sign up user: " + response.statusText);
                        newUser.prefs.sports = {};
                        removeAllTokens();
                    }
                });
                return;
            } else if (document.getElementById("0").checked === false) { // Nothing clicked
                newUser.prefs.sports = allSports;
            }
        } else {
            newUser.prefs = preferences;
        }
        //navigate('/TeamPreferences', {replace:true, state: newUser});
    }
    const labels = getLabels(sports)
    const checkboxes = labels.map((label, index) => {
        return (<Form.Check type={"checkbox"} label={label} id={index + 1} key={index + 1} onChange={(e) => checkSportOption(e, label)}/>);
    });
    function checkPref(e){
        if (e.target.checked === true){
            disableSportOptions(true);
            if (prefSize(preferences) > 0){ // NOTE: Unsure if needed check back later me -- HR
                removeAllTokens();
                labels.forEach((label, index) => {
                    document.getElementById(String(index + 1)).checked = false;
                });
            }
        } else {
            disableSportOptions(false);
        }
    }
    function removeAllTokens(){
        setPreferences({sports: {}});
    }
    function disableSportOptions(disabled){
        labels.forEach((label, index) => {
            document.getElementById(String(index + 1)).disabled = disabled;
        });
    }
    function disablePrefOptions(disabled){
        document.getElementById("0").disabled = disabled;
    }

    function checkSportOption(e, token){
        if (e.target.checked === true){
            const newpref = preferences;
            newpref.sports[token] = {};
            newpref.sports[token].following = true;
            setPreferences(newpref);
            disablePrefOptions(true);
        } else {
            if (preferences.sports[token].hasOwnProperty("following")) {
                const newpref = preferences;
                delete newpref.sports[token];
                setPreferences(newpref);
            }
            disablePrefOptions(false);
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <div key={`default-checkbox`} className="mb-3">
                <Form.Check type="checkbox" label="No Preferences" id="0" key="0" onChange={(e) => checkPref(e)}/>
                {checkboxes}
            </div>
        </Form>
    );
}