import React, {useState} from "react";
import {redditLogo} from "./RedditHandler";

function Collapsible(props) {
    const [open, setOpen] = useState(true);
    const caret = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down"
             viewBox="0 0 16 16">
            <path
                d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
        </svg>
    )
    if (!props) {
        return null;
    }
    return (
        <div className="collapsible">
            {
                <p className="collapsible-header" onClick={() => setOpen(!open)}>
                    {props.icon && props.icon}
                    {props.title && props.title}
                    {caret}
                </p>
            }
            {
                (open === true) &&
                <div className="collapsible-content">
                    {props.children}
                </div>
            }
        </div>
    )
}

function CheckOption(props) {
    const [checked, setChecked] = useState(true);
    if (!props) {
        return null;
    }
    return (
        <div className="check-option" onClick={() => setChecked(!checked)}>
            <div className={"check-option-box " + (checked && "check-option-box-checked")} />
            {
                props.label &&
                <p className="check-option-label">{props.label}</p>
            }
        </div>
    )
}

function RangeOption(props) {
    const value = props.value;
    const setValue = props.setValue;
    if (!props || !props.min || !props.max || !value || !setValue) {
        return null;
    }
    function handleChange(event) {
        setValue(parseInt(event.target.value));
    }
    return (
        <div className="range-option">
            {
                props.label &&
                <p className="range-option-label">{props.label} {value}</p>
            }
            <input type="range" className="form-range range-option-slider" min={props.min} max={props.max} step="1" defaultValue={value} onChange={handleChange} />
        </div>
    )
}

export default function RedditPreferenceSelector(props) {
    const leaguePosts = props.leaguePosts;
    const setLeaguePosts = props.setLeaguePosts;
    const teamPosts = props.teamPosts;
    const setTeamPosts = props.setTeamPosts;
    if (!props || !props.prefs || !leaguePosts || !setLeaguePosts || !teamPosts || !setTeamPosts) {
        return null;
    }
    return (
        <>
            <Collapsible title="Reddit Settings" icon={redditLogo()}>
                <RangeOption label="League Posts:" value={leaguePosts} setValue={setLeaguePosts} min="0" max="10" />
                <RangeOption label="Team Posts:" value={teamPosts} setValue={setTeamPosts} min="0" max="10" />
            </Collapsible>
        </>
    )
}