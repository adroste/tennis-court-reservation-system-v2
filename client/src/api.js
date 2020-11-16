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

export const putCourtsApi = {
    url: `${BASE_PATH}/courts`,
    method: 'PUT',
    res: (currentData, reqData, _) => reqData,
};

export const getMailTemplatesApi = {
    url: `${BASE_PATH}/mail-templates`,
};

export const putMailTemplatesApi = {
    url: `${BASE_PATH}/mail-templates`,
    method: 'PUT',
    res: (currentData, reqData, _) => ({
            ...currentData,
            ...reqData
    }),
};

export const putTemplatesApi = {
    url: `${BASE_PATH}/templates`,
    method: 'PUT',
    res: (currentData, reqData, _) => ({
            ...currentData,
            ...reqData
    }),
};

export const getUsersApi = {
    url: `${BASE_PATH}/users`,
};

export const putUserApi = {
    url: `${BASE_PATH}/users`,
    method: 'PUT',
    res: (users, reqData, _) => (
        users.map(u => {
            if (u.userId === reqData.userId)
                return { 
                    ...u,
                    ...reqData,
                };
            return u;
        })
    ),
};

export const deleteUserApi = {
    url: `${BASE_PATH}/users`,
    method: 'DELETE',
    res: (users, { userId }, _) => (
        users.filter(u => u.userId !== userId)
    ),
};
