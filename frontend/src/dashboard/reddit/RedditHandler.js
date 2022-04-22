import {useQueries, useQuery} from "react-query";
import axios from "axios";
import {verify} from "../../util/Util";

function getTeamSubreddit(sports, sport, teamId) {
    const team = sports.find(s => s.sport === sport).teams.find(t => t.code === teamId);
    return team.subreddit ? team.subreddit : "";
}

function getLeagueSubreddit(sports, sport) {
    console.log(sport);
    const league = sports.find(s => s.sport === sport);
    return league.subreddit ? league.subreddit : "";
}

export function useSubreddit(sports, sport, teamCode) {
    return useQuery(
    ["subreddit", sport, teamCode],
    async () => {
        const query = getTeamSubreddit(sports, sport, teamCode);
        return await axios
            .get("http://localhost:5000/subreddit/" + query)
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

export function useTeamSubreddits(sports, key, sportTeamPairs) {
    return useQueries(
        sportTeamPairs.map(([sport, teamCode]) => {
            return {
                queryKey: ["subreddit", sport, teamCode],
                queryFn: async () => {
                    const query = getTeamSubreddit(sports, sport, teamCode);
                    return await axios
                        .get("http://localhost:5000/subreddit/" + query)
                        .then((res) => {
                            return verify(res);
                        });
                },
                refetchOnWindowFocus: false,
                refetchOnmount: false,
                refetchOnReconnect: false,
            }
        })
    );
}

export function useLeagueSubreddits(sports, key, sportList) {
    return useQueries(
        sportList.map((sport) => {
            return {
                queryKey: ["subreddit", sport],
                queryFn: async () => {
                    const query = getLeagueSubreddit(sports, sport);
                    return await axios
                        .get("http://localhost:5000/subreddit/" + query)
                        .then((res) => {
                            return verify(res);
                        });
                },
                refetchOnWindowFocus: false,
                refetchOnmount: false,
                refetchOnReconnect: false,
            }
        })
    );
}