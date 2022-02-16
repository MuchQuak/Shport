import axios from "axios";

export async function fetchNBAStats(){
    try {
        const response = await axios.get('http://localhost:5000/NBA/standings');
        return response.data.teams;
    }
    catch (error){
        console.log(error);
        return false;
    }
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