const BASE_PATH = '/api';

export const getBaseDataApi = {
    url: `${BASE_PATH}/base-data`,
};

export const putConfigApi = {
    url: `${BASE_PATH}/config`,
    method: 'PUT',
};

export const getMailTemplatesApi = {
    url: `${BASE_PATH}/mail-templates`,
};