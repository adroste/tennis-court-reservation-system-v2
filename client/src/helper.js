export function findReservation(reservations, from, to, courtId) {
    if (!reservations)
        return null;
    return reservations.find(r => reservationOverlap(r, { from, to, courtId }));
}

export function reservationOverlap(r1, r2) {
    return r1.from.isBefore(r2.to, 'hour')
        && r1.to.isAfter(r2.from, 'hour')
        && r1.courtId === r2.courtId;
}

export function getCourtName(courts, courtId) {
    return courts.find(c => c.courtId === courtId)?.name;
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

export function visibleHoursToLocalizedHourRange(date, visibleHours) {
    const start = parseInt(visibleHours[0]);
    const end = parseInt(visibleHours[1]);
    const startDate = date.hour(start);
    const endDate = date.hour(end);
    const hours = [];
    for (let from = startDate; from.isBefore(endDate, 'hour');) {
        const to = from.add(1, 'hour');
        hours.push({ from, to });
        from = to;
    }
    return hours;
}

export function visibleHoursToHoursArray([start, end]) {
    const hours = [];
    for (let i = parseInt(start); i < parseInt(end); ++i)
        hours.push(i);
    return hours;
}