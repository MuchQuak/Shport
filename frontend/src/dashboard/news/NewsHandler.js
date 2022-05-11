import axios from "axios";
import { verify } from "../../util/Util";
import { useQuery } from "react-query";
import {BACKEND} from "../../index";

// returns an object where article list can be accessed through data attribute (make sure isSuccess first)
export function useNews(key, interests) {
  return useQuery(
    [key, interests],
    async () => {
      const query =
        interests.length > 0 ? "(" + interests.join(") OR (") + ")" : "sports";
      return await axios
        .get(BACKEND + "news/" + query)
        .then((res) => {
          return verify(res);
        });
    },
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
    }
  );
}

// returns a list of queries than can be joined to create a query ready to be sent
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
