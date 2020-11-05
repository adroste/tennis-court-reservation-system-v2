export function findReservation(reservations, date, court) {
    for (let r of reservations)
        if (date.isSame(r.date, 'hour') && court === r.court)
            return r;
    return null;
}