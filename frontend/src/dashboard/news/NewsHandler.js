import axios from "axios";
import {verify} from "../../util/Util";

export async function newsQuery(prefs) {
  const query = prefs.length > 0 ? prefs.join(" OR ") : "sports";
  return await axios.get("http://localhost:5000/news/" + query).then((res) => {
    return verify(res);
  });
}