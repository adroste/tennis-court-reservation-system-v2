import { Button, notification } from 'antd';
import { deleteReservationGroupApi, deleteUserApi, getBaseDataApi, getMailTemplatesApi, getReservationsApi, getUsersApi, patchConfigApi, patchReservationGroupApi, patchUserApi, postLoginApi, postLogoutApi, postRegisterApi, postReservationGroupApi, postSendVerifyMailApi, postVerifyMailApi, putCourtsApi, putMailTemplateApi, putTemplateApi } from '../api';

import dayjs from 'dayjs';
import { db } from './mockDatabase';
import { demoControl } from './DemoControls';
import { parseQuery } from '../helper';

const fakeDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const cn = ({ url, method }) => {
    let u = method || 'GET';
    const di = url.indexOf(':');
    return u + (di !== -1 ? url.slice(0, di) : url);
};

async function handleRequests(url, options) {
    const body = options.body ? JSON.parse(options.body) : null;

    const queryIndex = url.indexOf('?');
    const cleanUrl = queryIndex !== -1 ? url.slice(0, queryIndex) : url;
    const params = parseQuery(url.slice(queryIndex));

    const lastSlashIndex = cleanUrl.lastIndexOf('/');
    const firstUrlPart = cleanUrl.slice(0, lastSlashIndex + 1);
    const lastUrlPart = cleanUrl.slice(lastSlashIndex + 1);

    const tryStrings = [
        `${options.method}${cleanUrl}`,
        `${options.method}${firstUrlPart}`,
    ];

    for (let s of tryStrings) {
        switch (s) {
            case cn(getBaseDataApi):
                return {
                    config: db.config,
                    courts: db.courts,
                    templates: db.templates,
                };

            case cn(patchConfigApi):
                db.config = {
                    ...db.config,
                    ...body,
                };
                return { success: true };

            case cn(putCourtsApi):
                db.courts = body;
                return { success: true };

            case cn(getMailTemplatesApi):
                return db.mailTemplates;

            case cn(putMailTemplateApi):
                db.mailTemplates = {
                    ...db.mailTemplates,
                    [body.id]: body,
                };
                return { success: true };

            case cn(putTemplateApi):
                db.templates = {
                    ...db.templates,
                    [body.id]: body,
                };
                return { success: true };

            case cn(getUsersApi):
                return db.users.map(user => ({
                    ...user,
                    upcomingReservationCount: 123,
                    totalReservationCount: 1234,
                    lastActivity: dayjs(),
                }));

            case cn(patchUserApi):
                db.users = db.users.map(u => {
                    if (u.userId === body.userId)
                        return {
                            ...u,
                            ...body,
                            verified: (!body.mail || u.mail === body.mail)
                                ? u.verified : false,
                        };
                    return u;
                });
                return { success: true };

            case cn(postRegisterApi):
                if (db.users.some(u => u.mail === body.mail))
                    return {
                        __status: 400,
                        json: { message: 'mail already registered' }
                    };
                const newUser = {
                    name: body.name,
                    mail: body.mail,
                    password: 'hashedPw',
                    userId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                    verified: false,
                    admin: false,
                };
                db.users.push(newUser);
                return {
                    token: `demo-token.${newUser.userId}`,
                    userId: newUser.userId,
                    name: newUser.name,
                    mail: newUser.mail,
                    verified: newUser.verified,
                    admin: newUser.admin,
                };

            case cn(postLoginApi): {
                // await fakeDelay(800);
                const { type, token, mail, /* password */ } = body;
                let user;
                if (type === 'token') {
                    const userId = parseInt(token.split('.')[1]);
                    user = db.users.find(u => u.userId === userId);
                } else {
                    // ignore password in demo
                    user = db.users.find(u => u.mail === mail);
                }
                if (!user)
                    return {
                        __status: 401,
                        json: { message: 'wrong login' }
                    };
                return {
                    token: `demo-token.${user.userId}`,
                    userId: user.userId,
                    name: user.name,
                    mail: user.mail,
                    verified: user.verified,
                    admin: user.admin,
                };
            }

            case cn(postLogoutApi):
                return { success: true };

            case cn(deleteUserApi):
                db.users = db.users.filter(u => u.userId !== body.userId);
                return { success: true };

            case cn(postSendVerifyMailApi): {
                const verifyToken = btoa(body.mail);
                notification.warn({
                    key: 'fake-verification',
                    message: 'Demo E-Mail Verifikation',
                    duration: 0,
                    placement: 'bottomRight',
                    description: (
                        <div>
                            <p>Dies simuliert den Verifikationsprozess für <strong>{body.mail}</strong>.</p>
                            <Button onClick={() => {
                                demoControl.history?.push(`/verify-mail/${verifyToken}`);
                                notification.close('fake-verification');
                            }}>
                                E-Mail Verifizieren (Demo)
                        </Button>
                        </div>
                    ),
                });
                return { success: true };
            }

            case cn(postVerifyMailApi): {
                const mail = atob(body.token);
                const user = db.users.find(u => u.mail === mail);
                if (!user)
                    return {
                        __status: 404,
                        json: { message: 'user not found' }
                    };
                user.verified = true;
                return { success: true };
            }

            case cn(getReservationsApi): {
                const start = params.start && dayjs(params.start);
                const end = params.end && dayjs(params.end);
                const groupId = params['group-id'] && parseInt(params['group-id']);
                const userId = params['user-id'] && parseInt(params['user-id']);
                const reservations = [];

                const checkDate = (date) => {
                    if (start && end)
                        return date.isBetween(start, end, '[]');
                    else if (start)
                        return date.isSameOrAfter(start);
                    else if (end)
                        return date.isSameOrBefore(end);
                    return true;
                };

                const checkGroupId = (gId) => {
                    if (groupId)
                        return groupId === gId;
                    return true;
                };

                const checkUserId = (uId) => {
                    if (userId)
                        return userId === uId;
                    return true;
                };

                db.reservations.forEach(r => {
                    if (checkDate(r.date)) {
                        db.reservationGroups.forEach(g => {
                            if (g.groupId === r.groupId && checkGroupId(g.groupId)) {
                                db.users.forEach(u => {
                                    if (g.userId === u.userId && checkUserId(u.userId)) {
                                        reservations.push({
                                            ...r,
                                            ...g,
                                            name: u.name,
                                            created: undefined,
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
                return reservations;
            }

            case cn(deleteReservationGroupApi):
            case cn(patchReservationGroupApi):
            case cn(postReservationGroupApi): {
                let groupId;
                try {
                    groupId = parseInt(lastUrlPart);
                } catch (e) { }
                groupId = groupId || db.reservationGroups.reduce((nextId, g) => {
                    return Math.max(nextId, g.groupId);
                }, 0) + 1;
                const customName = body?.customName;
                const dates = body?.dates?.map(d => dayjs(d).startOf('hour'));

                if (!dates?.length) {
                    // same as delete all
                    db.reservationGroups = db.reservationGroups.filter(g => g.groupId !== groupId);
                    db.reservations = db.reservations.filter(r => r.groupId !== groupId);
                } else {
                    const group = db.reservationGroups.find(g => g.groupId === groupId);
                    if (customName && group) {
                        group.customName = customName;
                    }

                    const { groupReservations, rest } = db.reservations.reduce((acc, r) => {
                        if (r.groupId === groupId)
                            acc.groupReservations.push(r);
                        else
                            acc.rest.push(r);
                        return acc;
                    }, { groupReservations: [], rest: [] });
                    const courtId = body?.courtId || groupReservations[0].courtId;
                    if (body?.courtId && groupReservations.length > 0 && groupReservations[0].courtId !== body?.courtId)
                        return {
                            __status: 400,
                            json: { message: 'courtId change not implemented' }
                        };

                    const { keepReservations, newReservations } = dates.reduce((acc, date) => {
                        const found = groupReservations.find(r => r.date.isSame(date, 'hour'));
                        if (found)
                            acc.keepReservations.push(found);
                        else
                            acc.newReservations.push({
                                date,
                                courtId,
                                groupId,
                                created: dayjs(),
                            });
                        return acc;
                    }, { keepReservations: [], newReservations: [] });

                    const userId = group?.userId || body?.userId;
                    const user = db.users.find(u => u.userId === userId);

                    const court = db.courts.find(c => c.courtId === courtId);
                    const today = dayjs();
                    const maxDate = today.add(db.config.reservationDaysInAdvance, 'day');
                    const conflicts = newReservations.reduce((conflicts, { date }) => {
                        if (
                            (!user.admin && date.isAfter(maxDate, 'day'))
                            || (!user.admin && date.isBefore(today, 'day'))
                            || db.reservations.some(r => r.date.isSame(date, 'hour'))
                            || (court.disabledFromTil && date.isBetween(court.disabledFromTil[0], court.disabledFromTil[1], 'day', '[]'))
                        ) {
                            conflicts.push(date);
                        }
                        return conflicts;
                    }, []);

                    if (conflicts.length > 0)
                        return {
                            __status: 409,
                            json: { unavailableDates: conflicts }
                        };

                    const updatedReservations = [
                        ...rest,
                        ...keepReservations,
                        ...newReservations,
                    ];

                    if (!user.admin) {
                        const userGroupIds = [
                            groupId,
                            ...db.reservationGroups
                                .filter(g => g.userId === userId)
                                .map(g => g.groupId)
                        ];
                        const resCount = updatedReservations.reduce((acc, r) => {
                            if (userGroupIds.includes(r.groupId) && r.date.isSameOrAfter(today, 'day'))
                                return acc + 1;
                            return acc;
                        }, 0);

                        if (resCount > db.config.reservationMaxActiveCount)
                            return {
                                __status: 403,
                                json: {
                                    message: 'too many active reservations',
                                    value: resCount,
                                    max: db.config.reservationMaxActiveCount,
                                }
                            };
                    }

                    db.reservations = updatedReservations;

                    // new reservation ~ post
                    if (!groupReservations.length) {
                        const group = {
                            groupId,
                            userId,
                            customName,
                        };
                        db.reservationGroups.push(group);

                        return newReservations.map(r => ({
                            ...r,
                            ...group,
                            name: user.name,
                            created: undefined,
                        }));
                    }
                }

                return { success: true };
            }

            default:
        }
    }

    return null;
}

function byteLen(x) {
    const str = typeof x === 'string' ? x : JSON.stringify(x);
    const m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
}

export function patchFetch() {
    const _fetch = window.fetch;

    window.fetch = async (url, options) => {

        await fakeDelay(200);

        let res;
        try {
            res = await handleRequests(url, options || {});
        } catch (err) {
            console.log(err);
            res = {
                __status: 500,
                json: { error: true },
            };
        }

        console.log("Fake API:", {
            request: { url, options },
            response: res,
            db,
            totalKb: byteLen({ res, }) / 1024,
        });

        if (res?.__status) {
            return Promise.resolve({
                ok: false,
                status: res.__status,
                json: async () => Promise.resolve(JSON.parse(JSON.stringify(res.json))),
            });
        } else if (res) {
            return Promise.resolve({
                ok: true,
                json: async () => Promise.resolve(JSON.parse(JSON.stringify(res))),
            });
        }

        return _fetch(url, options);
    };
}