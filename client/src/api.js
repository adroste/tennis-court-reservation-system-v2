const BASE_PATH = '/api';

export const getBaseDataApi = {
    url: `${BASE_PATH}/base-data`,
};

export const putConfigApi = {
    url: `${BASE_PATH}/config`,
    method: 'PUT',
    res: (currentData, reqData, _) => ({
            ...currentData,
            ...reqData,
    }),
};

export const getMailTemplatesApi = {
    url: `${BASE_PATH}/mail-templates`,
};

export const putMailTemplatesApi = {
    url: `${BASE_PATH}/mail-templates`,
    method: 'PUT',
    res: (currentData, reqData, resData) => ({
            ...currentData,
            [reqData.id]: reqData,
    }),
};

export const putTemplatesApi = {
    url: `${BASE_PATH}/templates`,
    method: 'PUT',
    res: (currentData, reqData, resData) => ({
            ...currentData,
            [reqData.id]: reqData,
    }),
};