import axios from "axios";

export async function fetchNews(){
    try {
        const response = await axios.get('http://localhost:5000/news');
        return response.data.articles;
    }
    catch (error){
        console.log(error);
        return false;
    }
}