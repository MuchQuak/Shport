// Retrieves a sport by its code (ex: "NBA", "NFL")
export function byCode(sports, code) {
    let found = {};
    try {
    sports.forEach((sport) => {
        if (sport["sport"] === code) {
            found = sport;
        }
    });
    } catch (error) {}
    return found;
}