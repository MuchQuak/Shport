import axios from "axios";
import { verify } from "../../util/Util";
import { useQuery } from "react-query";

export async function newsQuery(prefs) {
  const query = prefs.length > 0 ? "(" + prefs.join(") OR (") + ")" : "sports";
  return await axios.get("http://localhost:5000/news/" + query).then((res) => {
    return verify(res);
  });
}

export function useNews(key, interest, setter) {
  return useQuery([key, interest], () => newsQuery(interest), {
    onSuccess: (data) => setter(data),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
  });
}

export function createTeamQuery(teams) {
  return teams
    .filter((t) => t.name && t.sport && t.city)
    .map(
      (t) =>
        t.name +
        " AND " +
        t.sport +
        ") OR (" +
        t.city +
        " " +
        t.name +
        ") OR (" +
        t.city +
        " AND " +
        t.name
    );
}

// Join two article arrays, purge duplicates and keep sorted
export function joinArticles(first, second) {
  return first
    .concat(second)
    .filter(
      (v, i, a) => a.findIndex((v2) => v2.title.trim() === v.title.trim()) === i
    ) // make articles unique on title
    .filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["date", "description", "publishBy"].every((k) => v2[k] === v[k])
        ) === i
    ) // unique on other attributes
    .sort((one, two) => Date.parse(two.date) - Date.parse(one.date)); // sort by date descending
}
