import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import {fetchSports, getLabels} from "./SportHandler";
import LeagueOption from "./LeagueOption";
import "./style/Selector.css";

export default function LeaguePreferenceSelector(props) {
    const [sports, setSports] = useState([]);
    const [allDisabled, setAllDisabled] = useState(false);
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
    const checkboxes = () => {
        return (
            <div className='league-options'>
                {labels.map((league, index) => {
                    return (<LeagueOption league={league} key={index + 1} click={() => checkSportOption(league)} disabled={allDisabled} active={!allDisabled && selectedLeagues.includes(league)}/>);
                })}
            </div>
        );
    };
    function checkPref(e){
        if (e.target.checked === true){
            disableSportOptions();
        } else {
            setAllDisabled(false);
        }
    }
    function disableSportOptions() {
        setSelectedLeagues([]);
        setAllDisabled(true);
    }
    function checkSportOption(token) {
        if (selectedLeagues.includes(token)) {
            setSelectedLeagues(selectedLeagues.filter((item) => item !== token))
        } else {
            setSelectedLeagues([...selectedLeagues, token]);
        }
    }
    return (
        <div className='leaguePreferences'>
            <Form.Check type="checkbox" label="No Preferences" id="0" key="0" onChange={(e) => checkPref(e)}/>
            {checkboxes()}
        </div>
    );
}