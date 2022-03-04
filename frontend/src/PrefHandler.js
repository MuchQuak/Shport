/*  Per User (supplied to each React component)
prefs: {
  sports: {
      following: false,
      NBA: {
          following: true,
          teams: ["LAL"] // Just codes from the sports
      },
      NHL: {
          following: false
          teams: [""] //convert to string
      },
   }
}
*/

export const all_prefs = {
    sports: {
        following: true,
        NBA: {
            teams: ["LAL", "CHI", "SAC"] // for testing purposes, we could even expand this to be the master list however...
        },
        NFL: {},
        NHL: {},
        MLB: {}
    }
}

// Retrieve a list of all teams a user follows, given a sport (example sport: 'NBA') (example output: ['LAL', 'CHA', 'SAC'])
export function getTeamsFollowedForSport(prefs, sport) {
    if (!prefs.sports) {
        return []; // No sports interest...?
    }
    if (!prefs.sports[sport] || !prefs.sports[sport].teams || prefs.sports[sport].teams.length === 0) {
        return []; // No sport in their interest, or no teams within such sport, or zero length in the array
    }
    return prefs.sports[sport].teams;
}

// Retrieve a list of all sports that a user follows (or all if 'following: true')
export function getSportsFollowed(prefs) {
    if (prefs.sports) {
        if (prefs.sports.following === true) { // They follow all sports
            return Object.keys(prefs.sports) // IN FUTURE: THIS SHOULD BE A RETRIEVAL FROM THE MASTER LIST (HARDCODED)
                .filter(sport => sport !== 'following'); // To get all sports, besides the follow all boolean
        }
        return Object.keys(prefs.sports)
            .filter(sport => sport !== 'following') // To get all sports, besides the follow all boolean
            .filter(sport => prefs.sports[sport].following && prefs.sports[sport].following === true); // To get all they follow
    } else {
        return getSportsFollowed(all_prefs);
    }
}

// Retrieve a list of all sports that a user is following at least one team for
export function getSportsWithOneTeamFollowed(prefs) {
    const retrievedSports = [];
    if (prefs.sports) {
        for (const [key, value] of Object.entries(prefs.sports)) {
            if (value.hasOwnProperty("teams") && value.teams.length > 0) {
                retrievedSports.push(key);
            }
        }
    } else {
        retrievedSports.push(...getSportsFollowed(all_prefs));
    }
    return retrievedSports;
}

export function getInterestedSports(prefs) {
    if (prefs.sports) {
        return [...new Set([...getSportsFollowed(prefs), ...getSportsWithOneTeamFollowed(prefs)])];
    } else {
        return getSportsFollowed(all_prefs);
    }
}

export function getPreferredSport(prefs) {
    const followed = getSportsFollowed(prefs);
    if (followed.length < 1) {
        return null;
    }
    return getSportsFollowed(prefs)[0];
}

export function getPreferredSportIndex(prefs, sportsNames) {
    if (!prefs) {
        return 0;
    }
    const pref = getPreferredSport(prefs);
    if (pref === null) {
        return 0;
    }
    return sportsNames.indexOf(pref);
}

export function prefSize(preferences) {
    let total = 0;
    for (const [key, value] of Object.entries(preferences.sports)) {
        if (preferences.sports[key].hasOwnProperty("following")){
            if (preferences.sports[key].following === true) {
                total += 1;
            }
        }
    }
    return total;
}