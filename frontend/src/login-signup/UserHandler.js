import axios from "axios";

export async function addUser(user){
    try {
        return await axios.post('http://localhost:5000/signup', user);
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function setUserPrefs(prefs){
    try {
        return await axios.patch('http://localhost:5000/preferences', prefs);
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function prefsQuery(auth_token) {
    const url = 'http://localhost:5000/preferences';
    const config = {headers: {"auth_token": auth_token}};
    return await axios.get(url, config).then((res) => {
        if (res.status === 201){
            return res.data;
        }
        throw new Error("Error " + res.status + ": Could not retrieve preferences.")
    });
}