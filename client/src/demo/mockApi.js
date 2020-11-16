import { config, courts, mailTemplates, templates } from './mockDatabase';
import { getBaseDataApi, getMailTemplatesApi, putMailTemplatesApi, putTemplatesApi } from '../api';

const FAKE_LATENCY_MS = 200;

const cn = apiDesc => `${apiDesc.url}${apiDesc.method || 'GET'}`;

function handleRequests(url, options) {
    const body = options.body ? JSON.parse(options.body) : null;

    switch (`${url}${options.method}`) {
        case cn(getBaseDataApi):
            return {
                config,
                courts,
                templates,
            };

        case cn(getMailTemplatesApi):
            return mailTemplates;

        case cn(putMailTemplatesApi):
            mailTemplates[body.id] = body;
            return { success: true };

        case cn(putTemplatesApi):
            templates[body.id] = body;
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