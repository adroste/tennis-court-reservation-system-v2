export function findReservation(reservations, date, courtId) {
    for (let r of reservations)
        if (date.isSame(r.date, 'hour') && courtId === r.courtId)
            return r;
    return null;
}