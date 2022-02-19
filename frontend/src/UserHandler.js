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

export async function validateNewUsername(username){
    try{
        const response = await axios.post('http://localhost:5000/signup/username', {"username":username});
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}


export async function validateNewEmail(username, email){
    try{
        const response = await axios.post('http://localhost:5000/signup/username', {"username":username, "email":email});
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}