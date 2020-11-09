import dayjs from 'dayjs';
import { useMemo } from 'react';

const from = 8;
const til = 22;

// const courts = [
//     'Platz 1',
//     'Platz 2',
// ];

const courtCount = 2;

const names = [
    'Müller',
    'Manuel Neuer',
    'Franz Peter',
    'Jürgen',
    'Tim und Struppi',
    'Grönemeyer',
    'Freddie',
    'Manfred M.',
];

const reservations = [];

// deterministic
function mockSingleReservation(i, mDate, groupId, customName) {

    const id = `${i}_${mDate}`;

    const courtId = i % courtCount;

    const userId = ((i * 3) % names.length) + 1;
    const name = names[userId - 1];

    const date = mDate.add(((i * 9) % (til - from)) + from, 'hour');

    return {
        id,
        date,
        userId,
        name,
        customName,
        courtId,
        groupId,
    };
}

function mockReservations() {

    const start = dayjs().startOf('week');
    const reservationPerDay = [3,4,1,7,1,0,2];

    // group reservations (repeat = 1)
    let gId = 1;
    for (let day = 0; day < 4; ++day) {
        const cur = start.add(day, 'day');
        reservations.push(mockSingleReservation(24, cur, gId, '4-Tage Event'));
    }

    // group reservations (repeat = 7)
    gId = 2;
    for (let day = 5; day < 7 * 4; day += 7) {
        const cur = start.add(day, 'day');
        reservations.push(mockSingleReservation(94, cur, gId, 'Training'));
    }

    // single reservations
    for (let day = 0; day < 7 * 4; ++day) {
        const cur = start.add(day, 'day');
        for (let i = 0; i < reservationPerDay[day % 7]; ++i)
            reservations.push(mockSingleReservation(i + day, cur, null, null));
    }
}


export function useWeekReservations(date) {
    if (!reservations.length)
        mockReservations();

    return useMemo(() => reservations.filter(r => date && r.date.isSame(date, 'week')), [date]);
}


export function useGroupReservations(groupId) {
    if (!reservations.length)
        mockReservations();

    return useMemo(() => reservations.filter(r => groupId && r.groupId === groupId), [groupId]);
}


export function useUserReservations(userId) {
    if (!reservations.length)
        mockReservations();

    return useMemo(() => {
        const r = reservations.filter(r => userId && r.userId === userId)
        r.sort((a, b) => a.date.valueOf() - b.date.valueOf());
        return r;
    }, [userId]);
}