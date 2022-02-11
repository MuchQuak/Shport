import React from "react";

export default function NFLItem(props) {
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
    if (!props.prefs.league.NFL) {
        return null;
    }
    */
    const nflLogo = <div className='logo-container'><img className='logo' id='sport-logo' src='https://static.nfl.com/static/content/public/static/wildcat/assets/img/application-shell/shield/default.svg' alt='NFL-logo'/></div>;
    return React.cloneElement(props.children, { prefs: props.prefs, logo: nflLogo });
}