import React from "react";

export default function MLBItem(props) {
    if (!props) {
        return null;
    }
    if (!props.prefs) {
        return null;
    }
    // RETURN WHEN PREFS ARE FIXED
    /*
    if (!props.prefs.league) {
        return null;
    }
    if (!props.prefs.league.MLB) {
        return null;
    }
    */
    const nbaLogo = <div className='logo-container'><img className='logo' id='sport-logo' src='https://www.mlbstatic.com/team-logos/league-on-dark/1.svg' alt='MLB-logo'/></div>;
    return React.cloneElement(props.children, { prefs: props.prefs, logo: nbaLogo });
}