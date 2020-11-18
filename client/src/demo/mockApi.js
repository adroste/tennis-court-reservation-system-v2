import { Button, notification } from 'antd';
import { deleteUserApi, getBaseDataApi, getMailTemplatesApi, getUsersApi, postLoginApi, postLogoutApi, postRegisterApi, postSendVerifyMailApi, postVerifyMailApi, putConfigApi, putCourtsApi, putMailTemplatesApi, putTemplatesApi, putUserApi } from '../api';

import { db } from './mockDatabase';
import { demoControl } from './DemoControls';

const fakeDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const cn = apiDesc => `${apiDesc.url}${apiDesc.method || 'GET'}`;

async function handleRequests(url, options) {
    const body = options.body ? JSON.parse(options.body) : null;

    switch (`${url}${options.method}`) {
        case cn(getBaseDataApi):
            return {
                config: db.config,
                courts: db.courts,
                templates: db.templates,
            };

        case cn(putConfigApi):
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

        case cn(putMailTemplatesApi):
            db.mailTemplates = {
                ...db.mailTemplates,
                ...body,
            };
            return { success: true };

        case cn(putTemplatesApi):
            db.templates = {
                ...db.templates,
                ...body,
            };
            return { success: true };

        case cn(getUsersApi):
            return db.users;

        case cn(putUserApi):
            db.users = db.users.map(u => {
                if (u.userId === body.userId)
                    return {
                        ...u,
                        ...body,
                        verified: u.mail === body.mail 
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
            await fakeDelay(800);
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
            return null;
    }

}

export function patchFetch() {
    const _fetch = window.fetch;

    window.fetch = async (url, options) => {

        await fakeDelay(200);

        let res;
        try {
            res = await handleRequests(url, options);
        } catch (err) {
            res = { 
                __status: 500,
                json: { error: true },
            };
        }

        console.log("Fake API:", {
            request: {url, options},
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