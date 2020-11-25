import { Button, notification } from 'antd';
import { deleteUserApi, getBaseDataApi, getMailTemplatesApi, getReservationsApi, getUsersApi, patchConfigApi, patchReservationGroupApi, patchUserApi, postLoginApi, postLogoutApi, postRegisterApi, postReservationGroupApi, postSendVerifyMailApi, postVerifyMailApi, putCourtsApi, putMailTemplateApi, putTemplateApi } from '../api';

import { RESERVATION_TYPES } from '../ReservationTypes';
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

    let authUserId = options.headers?.["Authorization"]?.split('.')[1];
    authUserId = authUserId && parseInt(authUserId);

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
                    registeredAt: dayjs(),
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

                const checkDate = ({ from, to }) => {
                    let check = true;
                    if (start)
                        check = check && start.isSameOrBefore(to);
                    if (end)
                        check = check && end.isSameOrAfter(from);
                    return check;
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
                    if (checkDate(r)) {
                        db.reservationGroups.forEach(g => {
                            if (g.groupId === r.groupId && checkGroupId(g.groupId)) {
                                const user = db.users.find(u => g.userId === u.userId);
                                if (checkUserId(user?.userId))
                                    reservations.push({
                                        ...r,
                                        ...g,
                                        name: user?.name || undefined,
                                        created: undefined,
                                    });
                            }
                        });
                    }
                });
                return reservations;
            }

            // case cn(deleteReservationGroupApi):
            case cn(patchReservationGroupApi):
            case cn(postReservationGroupApi): {
                let groupId;
                try {
                    groupId = parseInt(lastUrlPart);
                } catch (e) { }
                groupId = groupId || db.reservationGroups.reduce((nextId, g) => {
                    return Math.max(nextId, g.groupId);
                }, 0) + 1;
                const text = body?.text;
                // todo real server: check if from,to are set
                const reservations = body?.reservations?.map(({ courtId, from, to }) => ({
                    courtId,
                    from: dayjs(from),
                    to: dayjs(to),
                }));

                if (!reservations?.length) {
                    // same as delete all
                    db.reservationGroups = db.reservationGroups.filter(g => g.groupId !== groupId);
                    db.reservations = db.reservations.filter(r => r.groupId !== groupId);
                } else {
                    const group = db.reservationGroups.find(g => g.groupId === groupId);
                    if (text && group) // group is null if post
                        group.text = text;

                    const { groupReservations, rest } = db.reservations.reduce((acc, r) => {
                        if (r.groupId === groupId)
                            acc.groupReservations.push(r);
                        else
                            acc.rest.push(r);
                        return acc;
                    }, { groupReservations: [], rest: [] });

                    const { keepReservations, newReservations } = reservations.reduce((acc, { courtId, from, to }) => {
                        const found = groupReservations.find(r =>
                            r.from.isSame(from, 'hour') 
                            && r.to.isSame(to, 'hour')
                            && r.courtId === courtId
                        );
                        if (found)
                            acc.keepReservations.push(found);
                        else
                            acc.newReservations.push({
                                from,
                                to,
                                courtId,
                                groupId,
                                created: dayjs(),
                            });
                        return acc;
                    }, { keepReservations: [], newReservations: [] });

                    const userId = group?.userId || authUserId;
                    const user = db.users.find(u => u.userId === userId);

                    const today = dayjs();
                    const maxDate = today.add(db.config.reservationDaysInAdvance, 'day');
                    const conflicts = newReservations.reduce((conflicts, { courtId, from, to }) => {
                        const conflict = rest.find(r => (
                            r.from.isBefore(to, 'hour')
                            && r.to.isAfter(from, 'hour')
                            && r.courtId === courtId
                        ));
                        if (conflict)
                            conflicts.push({ 
                                courtId, 
                                from: conflict.from.isAfter(from) ? conflict.from : from, 
                                to: conflict.to.isBefore(to) ? conflict.to : to, 
                            });
                        else if ((!user.admin && to.isAfter(maxDate, 'day'))
                            || (!user.admin && from.isBefore(today, 'hour')))
                            conflicts.push({ 
                                courtId, 
                                from, 
                                to 
                            });
                        return conflicts;
                    }, []);

                    if (conflicts.length > 0)
                        return {
                            __status: 409,
                            json: { unavailableReservations: conflicts }
                        };

                    const updatedReservations = [
                        ...rest,
                        ...keepReservations,
                        ...newReservations,
                    ];

                    if (!user.admin) {
                        // count user reservations
                        const userGroupIds = [
                            groupId,
                            ...db.reservationGroups
                                .filter(g => g.userId === userId)
                                .map(g => g.groupId)
                        ];
                        const resCount = updatedReservations.reduce((acc, r) => {
                            if (userGroupIds.includes(r.groupId) && r.from.isSameOrAfter(today, 'hour'))
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
                            text,
                            type: body?.type || RESERVATION_TYPES.NORMAL,
                            userId,
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