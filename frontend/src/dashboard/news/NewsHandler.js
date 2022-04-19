import axios from "axios";
import {verify} from "../../util/Util";

/*export async function fetchNews(prefs){
    const query = prefs.length > 0 ? prefs.join('||') : "sports";
    //const test = 'warriors||hawks'
    try {
        const response = await axios.get('http://localhost:5000/news/' + query);
        return response.data.articles;
    }
    catch (error){
        console.log(error);
        return false;
    }
}*/

export async function newsQuery(prefs) {
  const query = prefs.length > 0 ? prefs.join(" OR ") : "sports";
  return await axios.get("http://localhost:5000/news/" + query).then((res) => {
    return verify(res);
  });
}
