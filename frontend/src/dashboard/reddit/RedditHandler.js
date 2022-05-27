import { useQueries, useQuery } from "react-query";
import axios from "axios";
import { verify } from "../../util/Util";
import React from "react";
import {BACKEND} from "../../index";

export function redditLogo() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <g>
                <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
                <path
                    fill="#FFF"
                    d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"
                ></path>
            </g>
        </svg>
    );
}

function getTeamSubreddit(sports, sport, teamId) {
  const team = sports
    .find((s) => s.sport === sport)
    .teams.find((t) => t.code === teamId);
  return team.subreddit ? team.subreddit : "";
}

function getLeagueSubreddit(sports, sport) {
  if (sports === undefined || sport === undefined) {
      return "";
  }
  const league = sports.filter((s) => s !== undefined).find((s) => s.sport === sport);
  return league.subreddit ? league.subreddit : "";
}

export function useSubreddit(sports, sport, teamCode) {
  return useQuery(
    ["subreddit", sport, teamCode],
    async () => {
      const query = getTeamSubreddit(sports, sport, teamCode);
      return await axios
        .get(BACKEND + "subreddit/" + query)
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

export function useTeamSubreddits(sports, key, sportTeamPairs, numPosts) {
  return useQueries(
    sportTeamPairs.map(([sport, teamCode]) => {
      return {
        queryKey: ["subreddit", sport, teamCode],
        queryFn: async () => {
          const query = getTeamSubreddit(sports, sport, teamCode);
            if (query === "") {
                return [];
            }
          return await axios
            .get(BACKEND + "subreddit/" + query + "/" + numPosts)
            .then((res) => {
              return verify(res);
            });
        },
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
      };
    })
  );
}

export function useLeagueSubreddits(sports, key, sportList, numPosts) {
  return useQueries(
    sportList.map((sport) => {
      return {
        queryKey: ["subreddit", sport],
        queryFn: async () => {
          const query = getLeagueSubreddit(sports, sport);
          if (query === "") {
              return [];
          }
          return await axios
            .get(BACKEND + "subreddit/" + query + "/" + numPosts)
            .then((res) => {
              return verify(res);
            });
        },
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
      };
    })
  );
}

export function getTeamPosts(prefs) {
    if (prefs.reddit && prefs.reddit.teamPosts !== undefined) {
        return prefs.reddit.teamPosts;
    }
    return 1;
}

export function getLeaguePosts(prefs) {
    if (prefs.reddit && prefs.reddit.leaguePosts !== undefined) {
        return prefs.reddit.leaguePosts;
    }
    return 1;
}