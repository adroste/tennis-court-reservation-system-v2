import { config, courts, mailTemplates, templates } from './mockDatabase';
import { getBaseDataApi, getMailTemplatesApi } from '../api';

function handleRequests(url, options) {
    switch (url) {
        case getBaseDataApi.url:
            return {
                config,
                courts,
                templates,
            };

        case getMailTemplatesApi.url:
            return mailTemplates;

        default:
            return null;
    }

}

export function patchFetch() {
    const _fetch = window.fetch;

    window.fetch = (url, options) => {

        const res = handleRequests(url, options);
        if (res)
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(res),
            });

        return _fetch(url, options);
    };
}