/*  Master List (for supplying ALL options to user)
sports: {
    NBA: {
        "LAL": {..},
        "SAC": {..}
    }
    NHL: {
        "SJS": {..}
    }
}
*/

/*  Per User (supplied to each React component)
preferences: {
  sports: {
      following: false,
      NBA: {
          following: true,
          teams: ["LAL"]
      },
      NHL: {
          following: false
          teams: ["SJS"]
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
    if (!prefs.sports) {
        return []; // No sports interest...?
    }
    if (prefs.sports.following === true) { // They follow all sports
        return Object.keys(prefs.sports) // IN FUTURE: THIS SHOULD BE A RETRIEVAL FROM THE MASTER LIST (HARDCODED)
            .filter(sport => sport !== 'following'); // To get all sports, besides the follow all boolean
    }
    return Object.keys(prefs.sports)
        .filter(sport => sport !== 'following') // To get all sports, besides the follow all boolean
        .filter(sport => prefs.sports[sport].following && prefs.sports[sport].following === true); // To get all they follow
}