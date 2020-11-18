const BASE_PATH = '/api';

export const getBaseDataApi = {
    url: `${BASE_PATH}/base-data`,
};

export const patchConfigApi = {
    url: `${BASE_PATH}/config`,
    method: 'PATCH',
    setFunc: ({ cur, req }) => ({
        ...cur,
        ...req,
    }),
};

export const putCourtsApi = {
    url: `${BASE_PATH}/courts`,
    method: 'PUT',
    setFunc: ({ req }) => req,
};

export const postLoginApi = {
    url: `${BASE_PATH}/login`,
    method: 'POST',
};

export const postLogoutApi = {
    url: `${BASE_PATH}/logout`,
    method: 'POST',
};

export const getMailTemplatesApi = {
    url: `${BASE_PATH}/mail-templates`,
};

export const putMailTemplateApi = {
    url: `${BASE_PATH}/mail-template/:id`,
    method: 'PUT',
    setFunc: ({ cur, req }) => ({ 
        ...cur,
        [req.id]: req,
    }),
};

export const postRegisterApi = {
    url: `${BASE_PATH}/register`,
    method: 'POST',
};

export const getReservationsApi = {
    url: `${BASE_PATH}/reservations`,
    method: 'POST',
};

export const postReservationsApi = {
    url: `${BASE_PATH}/reservations`,
    method: 'POST',
    res: (curReservations, _, newReservations) => ([
            ...curReservations,
            ...newReservations,
    ]),
};

export const putReservationsApi = {
    url: `${BASE_PATH}/reservations`,
    method: 'PUT',
    res: (curReservations, updatedReservations, _) => (
        curReservations.map(r => {
            const update = updatedReservations.find(u => u.id === r.id);
            if (update)
                return {
                    ...r,
                    ...update,
                };
            return r;
        })
    ),
};

export const deleteReservationsApi = {
    url: `${BASE_PATH}/reservations`,
    method: 'DELETE',
    res: (curReservations, deletedIds, _) => (
        curReservations.filter(r => !deletedIds.includes(r.id))
    ),
};

export const postSendVerifyMailApi = {
    url: `${BASE_PATH}/send-verify-mail`,
    method: 'POST',
};

export const putTemplateApi = {
    url: `${BASE_PATH}/template/:id`,
    method: 'PUT',
    setFunc: ({ cur, req }) => ({ 
        ...cur,
        [req.id]: req,
    }),
};

export const getUsersApi = {
    url: `${BASE_PATH}/users`,
};

export const patchUserApi = {
    url: `${BASE_PATH}/user/:userId`,
    method: 'PATCH',
    setFunc: ({ cur, req }) => {
        if (Array.isArray(cur)) {
            return cur.map(u => {
                if (u.userId === req.userId)
                    return { 
                        ...u,
                        ...req,
                        verified: (!req.mail || u.mail === req.mail)
                            ? u.verified : false,
                    };
                return u;
            });
        } else {
            return {
                ...cur,
                ...req,
                verified: (!req.mail || cur.mail === req.mail)
                    ? cur.verified : false,
            };
        }
    },
};

export const deleteUserApi = {
    url: `${BASE_PATH}/user/:userId`,
    method: 'DELETE',
    setFunc: ({ cur, params }) => (
        cur.filter(u => u.userId !== params.path.userId)
    ),
};

export const postVerifyMailApi = {
    url: `${BASE_PATH}/verify-mail`,
    method: 'POST',
    setFunc: ({ cur }) => ({
            ...cur,
            verified: true,
    }),
};
