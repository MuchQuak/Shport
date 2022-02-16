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

export function NBA_logo(abbreviation) {
    const url = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + abbreviation.toLowerCase() + '.png';
    return (<div className='logo-container'><img className='logo' src={url} alt='logo'/></div>)
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

export function NHL_logo(id) {
    const url = 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + String(id) + '.svg';
    return (<div className='logo-container'><img className='logo' src={url} alt='logo'/></div>)
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

export async function fetchTodayNBAGames(){
    try {
        const response = await axios.get('http://localhost:5000/NBA');
        return response.data.games;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function fetchYesterdayNBAGames(){
    try {
        const response = await axios.get('http://localhost:5000/NBA/yesterday');
        return response.data.games;
    }
    catch (error){
        console.log(error);
        return false;
    }
}
export async function fetchTomorrowNBAGames(){
    try {
        const response = await axios.get('http://localhost:5000/NBA/tomorrow');
        return response.data.games;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function fetchTodayNHLGames(){
    try {
        const response = await axios.get('http://localhost:5000/NHL');
        return response.data.games;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function fetchYesterdayNHLGames(){
    try {
        const response = await axios.get('http://localhost:5000/NHL/yesterday');
        return response.data.games;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function fetchTomorrowNHLGames(){
    try {
        const response = await axios.get('http://localhost:5000/NHL/tomorrow');
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
    let found = {};
    try {
    sports.forEach((sport) => {
        if (sport["sport"] === code) {
            found = sport;
        }
    });
    } catch (error) {}
    return found;
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