import axios from "axios";

export async function addUser(user){
    try {
        const response = await axios.post('http://localhost:5000/users', user);
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function setUserPrefs(user){
    try {
        const response = await axios.patch('http://localhost:5000/preferences', user);
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}