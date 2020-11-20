export function findReservation(reservations, date, courtId) {
    if (!reservations)
        return null;

    for (let r of reservations)
        if (date.isSame(r.date, 'hour') && courtId === r.courtId)
            return r;
    return null;
}

export function parseQuery(queryString) {
    const query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}