import { Button, notification } from 'antd';
import { deleteUserApi, getBaseDataApi, getMailTemplatesApi, getUsersApi, patchConfigApi, patchUserApi, postLoginApi, postLogoutApi, postRegisterApi, postSendVerifyMailApi, postVerifyMailApi, putCourtsApi, putMailTemplateApi, putTemplateApi } from '../api';

import { db } from './mockDatabase';
import { demoControl } from './DemoControls';

const fakeDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const cn = apiDesc => `${apiDesc.method || 'GET'}${apiDesc.url}`;
const cn = ({ url, method }) => {
    let u = method || 'GET';
    const di = url.indexOf(':');
    return u + (di !== -1 ? url.slice(0, di) : url);
};

async function handleRequests(url, options) {
    const body = options.body ? JSON.parse(options.body) : null;

    const tryStrings = [
        `${options.method}${url}`,
        `${options.method}${url.slice(0, url.lastIndexOf('/') + 1)}`,
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
                return db.users;

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
                                demoControl.history?.push(`/verifymail/${verifyToken}`);
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

            default:
        }
    }

    return null;
}

export function patchFetch() {
    const _fetch = window.fetch;

    window.fetch = async (url, options) => {

        await fakeDelay(200);

        let res;
        try {
            res = await handleRequests(url, options);
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
        });

        if (res.__status) {
            return Promise.resolve({
                ok: false,
                status: res.__status,
                json: async () => Promise.resolve(res.json),
            });
        } else if (res) {
            return Promise.resolve({
                ok: true,
                json: async () => Promise.resolve(res),
            });
        }

        return _fetch(url, options);
    };
}