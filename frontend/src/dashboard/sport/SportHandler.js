import axios from "axios";
import {getImageSrc} from "../AssetHandler";

export async function standingsQuery(sport){
    return await axios.get('http://localhost:5000/' + sport + '/standings').then((res) => {
        return res.data.teams;
    });
}

export function NBA_logo(abbreviation, divId) {
    if (abbreviation === "" || abbreviation === "NBA") {
        return (
            <div className='logo-container logo-container-sport' id={divId}>
                <img className='logo' src={getImageSrc('NBA.svg')} alt='logo'/>
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

export function NHL_logo(id, divId) {
    if (id === "") {
        return (
            <div className='logo-container logo-container-sport' id={divId}>
                <img className='logo' src={getImageSrc('NHL.svg')} alt='logo'/>
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

export function MLB_logo(id, divId) {
    if (id === "" || id === "MLB") {
        return (
            <div className='logo-container logo-container-sport logo-container-sport-wide' id={divId}>
                <img className='logo' src={getImageSrc('MLB.svg')} alt='logo'/>
            </div>
        )
    }
    const url = 'https://www.mlbstatic.com/team-logos/team-cap-on-light/' + id.toLowerCase() + '.svg';
    return (
        <div className='logo-container' id={divId}>
            <img className='logo' src={url} alt='logo'/>
        </div>
    );
}

export function NFL_logo(abbreviation, divId) {
    if (abbreviation === "" || abbreviation === "NFL") {
        return (
            <div className='logo-container logo-container-sport' id={divId}>
                <img className='logo' src={getImageSrc('NFL.svg')} alt='logo'/>
            </div>
        )
    }
    const url = 'https://static.www.nfl.com/t_headshot_desktop_2x/f_auto/league/api/clubs/logos/' + abbreviation.toLowerCase();
    return (
        <div className='logo-container' id={divId}>
            <img className='logo' src={url} alt='logo'/>
        </div>
    );
}

export async function sportsQuery() {
    const response = await axios.get('http://localhost:5000/sport')
    return response.data;
}

export async function gamesQuery(sport, dayOffset){
    return await axios.get('http://localhost:5000/' + sport + '/games/' + dayOffset).then((res) => {
        return res.data.games;
    });
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
        case "MLB": return MLB_logo(code, divId);
        case "NFL": return NFL_logo(code, divId);
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

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getLabels(sports) {
    return sports.map((sport) => {
        return sport["sport"];
    });
}

export function getAllTeams(sports) {
    const allTeams = [];
    Object.keys(sports).forEach((key) => {
        if (sports[key].hasOwnProperty("teams")) {
            const teams = sports[key].teams.map((team) => {
                team.sport = sports[key].sport;
                return team;
            });
            allTeams.push(...teams);
        }
    });
    return allTeams;
}