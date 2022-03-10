import axios from "axios";

export async function fetchNews(prefs){
    const quer = prefs.join('||');
    const test = 'warriors||hawks'
    try {
        const response = await axios.get('http://localhost:5000/news/' + quer);
        return response.data.articles;
    }
    catch (error){
        console.log(error);
        return false;
    }
}