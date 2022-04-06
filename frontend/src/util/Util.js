export function allQueriesSuccessful(queries) {
    for (let query of queries) {
        if (!query.isSuccess) {
            return false;
        }
    }
    return true;
}

export const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));