const BASE_PATH = '/api';

export const getBaseDataApi = {
    url: `${BASE_PATH}/base-data`,
};

export const putConfigApi = {
    url: `${BASE_PATH}/config`,
    method: 'PUT',
    res: (curConfig, newConfig, _) => ({
            ...curConfig,
            ...newConfig,
    }),
};

export const putCourtsApi = {
    url: `${BASE_PATH}/courts`,
    method: 'PUT',
    res: (_, newCourts) => newCourts,
};

export const getMailTemplatesApi = {
    url: `${BASE_PATH}/mail-templates`,
};

export const putMailTemplatesApi = {
    url: `${BASE_PATH}/mail-templates`,
    method: 'PUT',
    res: (curMailTemplates, newMailTemplates, _) => ({
            ...curMailTemplates,
            ...newMailTemplates
    }),
};

export const putTemplatesApi = {
    url: `${BASE_PATH}/templates`,
    method: 'PUT',
    res: (curTemplates, newTemplates, _) => ({
            ...curTemplates,
            ...newTemplates
    }),
};

export const postLoginApi = {
    url: `${BASE_PATH}/login`,
    method: 'POST',
};

export const postLogoutApi = {
    url: `${BASE_PATH}/logout`,
    method: 'POST',
};

export const getUsersApi = {
    url: `${BASE_PATH}/users`,
};

export const postRegisterApi = {
    url: `${BASE_PATH}/register`,
    method: 'POST',
};

export const postSendVerifyMailApi = {
    url: `${BASE_PATH}/send-verify-mail`,
    method: 'POST',
};

export const postVerifyMailApi = {
    url: `${BASE_PATH}/verify-mail`,
    method: 'POST',
    res: (user, _) => ({
            ...user,
            verified: true,
    }),
};

export const putUserApi = {
    url: `${BASE_PATH}/users`,
    method: 'PUT',
    res: (currentData, reqData, _) => {
        if (Array.isArray(currentData)) {
            return currentData.map(u => {
                if (u.userId === reqData.userId)
                    return { 
                        ...u,
                        ...reqData,
                        verified: u.mail === reqData.mail 
                            ? u.verified : false,
                    };
                return u;
            });
        } else {
            return {
                ...currentData,
                ...reqData,
                verified: currentData.mail === reqData.mail 
                    ? currentData.verified : false,
            };
        }
    },
};

export const deleteUserApi = {
    url: `${BASE_PATH}/users`,
    method: 'DELETE',
    res: (users, { userId }, _) => (
        users.filter(u => u.userId !== userId)
    ),
};
