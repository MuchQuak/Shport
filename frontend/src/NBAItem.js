import React from "react";

export default function NBAItem(props) {
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
    if (!props.prefs.league.NBA) {
        return null;
    }
    */
    const nbaLogo = <div className='logo-container'><img className='logo' id='sport-logo' src='https://cdn.nba.com/logos/nba/nba-logoman.svg' alt='NBA-logo'/></div>;
    return React.cloneElement(props.children, { prefs: props.prefs, logo: nbaLogo });
}