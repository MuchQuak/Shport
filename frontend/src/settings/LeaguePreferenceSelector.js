import React, {useState} from "react";
import {getLabels, getLeagueLogo, sportsQuery} from "../dashboard/sport/SportHandler";
import {useQuery} from "react-query";
import {loading} from "../util/Util";

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
    if (!props || !props.sports || !props.selected || !props.setSelected) {
        return loading;
    }
    const sports = props.sports;
    const selectedLeagues = props.selected;
    function setSelectedLeagues(select) {
        props.setSelected(select);
    }
    const labels = getLabels(sports);
    function checkSportOption(token) {
        if (selectedLeagues.includes(token)) {
            setSelectedLeagues(selectedLeagues.filter((item) => item !== token))
        } else {
            setSelectedLeagues([...selectedLeagues, token]);
        }
    }
    return (
        <div className='league-wrapper'>
            {labels.map((league, index) => <LeagueOption league={league} key={index} click={() => checkSportOption(league)} disabled={false} active={selectedLeagues.includes(league)}/>)}
        </div>
    );
}