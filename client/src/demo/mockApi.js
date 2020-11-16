import { deleteUserApi, getBaseDataApi, getMailTemplatesApi, getUsersApi, putConfigApi, putCourtsApi, putMailTemplatesApi, putTemplatesApi, putUserApi } from '../api';

import { db } from './mockDatabase';

const FAKE_LATENCY_MS = 200;

const cn = apiDesc => `${apiDesc.url}${apiDesc.method || 'GET'}`;

function handleRequests(url, options) {
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
                    };
                return u;
            });
            return { success: true };
        
        case cn(deleteUserApi):
            db.users = db.users.filter(u => u.userId !== body.userId);
            return { success: true };

        default:
            return null;
    }

}

export function patchFetch() {
    const _fetch = window.fetch;

    window.fetch = async (url, options) => {

        await new Promise(resolve => setTimeout(resolve, FAKE_LATENCY_MS));

        const res = handleRequests(url, options);
        if (res)
            return Promise.resolve({
                ok: true,
                json: async () => Promise.resolve(res),
            });

        return _fetch(url, options);


    };
}