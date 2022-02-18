import axios from "axios";

export async function fetchNBAStandings(){
    try {
        const response = await axios.get('http://localhost:5000/NBA/standings');
        return response.data.teams;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export function NBA_logo(abbreviation, divId) {
    if (abbreviation === "" || abbreviation === "NBA") {
        return (
            <div className='logo-container' id={divId}>
                <img className='logo' id='sport-logo' src='https://cdn.nba.com/logos/nba/nba-logoman.svg' alt='logo'/>
            </div>
        )
    }
    const url = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
    return (
        <div className='logo-container' id={divId}>
            <img className='logo' src={url} alt='logo'/>
        </div>
    );
}

export async function fetchNHLStandings(){
    try {
        const response = await axios.get('http://localhost:5000/NHL/standings');
        return response.data.teams;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export function NHL_logo(id, divId) {
    if (id === "") {
        return (
            <div className='logo-container'>
                <img className='logo' id={divId} src='https://www-league.nhlstatic.com/images/logos/league-dark/133-flat.svg' alt='logo'/>
            </div>
        )
    }
    const url = 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + String(id) + '.svg';
    return (
        <div className='logo-container' id={divId}>
            <img className='logo' src={url} alt='logo'/>
        </div>
    );
}

export async function fetchSports(){
    try {
        const response = await axios.get('http://localhost:5000/sport');
        return response.data;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function fetchNBAGames(dayOffset){
    try {
        const response = await axios.get('http://localhost:5000/NBA/games/' + dayOffset);
        return response.data.games;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function fetchNHLGames(dayOffset){
    try {
        const response = await axios.get('http://localhost:5000/NHL/games/' + dayOffset);
        return response.data.games;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

// Retrieves a sport by its code (ex: "NBA", "NFL")
// sports is a sports object, like one retrieved by fetchSports() within a Component
export function byCode(sports, code) {
    return sports.find(sport => sport["sport"] === code);
}

export function UTCtoLocal(UTC) {
    const today = new Date(UTC);
    let hours = today.getHours();
    const period = hours > 12 ? "PM" : "AM";
    if (hours > 12) {
        hours -= 12;
    }
    return hours + ":" + String(today.getMinutes()).padStart(2, '0') + " " + period;
}

export function getTeamLogo(league, code, divId) {
    switch (league) {
        case "NBA": return NBA_logo(code, divId);
        case "NHL": return NHL_logo(code, divId);
        default: return null;
    }
}

export function getLeagueLogo(league) {
    return getTeamLogo(league, "", "sport-logo");
}

export function getFullName(code, league, sports) {
    if (!sports || code === "" || league === "") {
        return "";
    }
    const team = byCode(sports, league).teams.find(team => team.code === code);
    return team.city + " " + team.name;
}