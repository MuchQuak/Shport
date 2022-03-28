import React, {useEffect, useState} from "react";
<<<<<<< HEAD:frontend/src/settings/LeaguePreferenceSelector.js
import {fetchSports, getLabels, getLeagueLogo} from "../SportHandler";
import "./style/selector.scss";
=======
import {fetchSports, getLabels, getLeagueLogo} from "./SportHandler";
import "./style/settings.scss";
>>>>>>> 2ac40d9b84989206b2976c79873366fa6a884356:frontend/src/LeaguePreferenceSelector.js

export function LeagueOption(props){
    if (!props || !props.league || !props.click) {
        return null;
    }
    const icon = getLeagueLogo(props.league);
    const className = () => {
        if (props.disabled === true) {
            return ' league-option-inactive';
        } else if (props.active === true) {
            return ' league-option-active'
        }
        return ''
    }
    return (
        <div className={'league-option noselect' + className()} onClick={props.click}>
            <div className='logo-name-record'>
                {icon}{props.league}
            </div>
        </div>
    );
}

export default function LeaguePreferenceSelector(props) {
    const [sports, setSports] = useState([]);
    useEffect(() => {
        fetchSports().then(result => {
            if (result)
                setSports(result);
        });
    }, [] );
    if (!props || !sports || sports.length === 0 || !props.selected || !props.setSelected) {
        return null;
    }
    const selectedLeagues = props.selected;
    function setSelectedLeagues(select) {
        props.setSelected(select);
    }
    const labels = getLabels(sports)
    function checkSportOption(token) {
        if (selectedLeagues.includes(token)) {
            setSelectedLeagues(selectedLeagues.filter((item) => item !== token))
        } else {
            setSelectedLeagues([...selectedLeagues, token]);
        }
    }
    return (
        <div className='league-wrapper'>
            {labels.map((league, index) => {
                return (<LeagueOption league={league} key={index} click={() => checkSportOption(league)} disabled={false} active={selectedLeagues.includes(league)}/>);
            })}
        </div>
    );
}