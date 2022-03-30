import axios from "axios";
import {all_prefs} from "../settings/PrefHandler";

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

export async function getPrefs(auth_token){
    try {
        const url = 'http://localhost:5000/preferences';
        const config = {headers: {"auth_token": auth_token}};
        await axios.get(url, config)
            .then(res => {
                if (res.status === 201){
                    return res.data;
                }
                throw Error("Could not retrieve preferences.")
            });
    }
    catch (error){
        console.log(error);
        return all_prefs;
        //return error.data;
    }
}