import { RESERVATION_TYPES } from './ReservationTypes';
import dayjs from 'dayjs';
import { reservationOverlap } from './helper';

const BASE_PATH = '/api';

export const getBaseDataApi = {
    url: `${BASE_PATH}/base-data`,
    setFunc: ({ res }) => res,
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
    setFunc: ({ res }) => res.map(r => ({
        ...r,
        from: dayjs(r.from),
        to: dayjs(r.to),
    })),
};

export const postReservationGroupApi = {
    url: `${BASE_PATH}/reservation-group`,
    method: 'POST',
    setFunc: ({ cur, res }) => {
        if (!res?.length)
            return cur;

        let out = [...cur];
        if (res[0].type === RESERVATION_TYPES.DISABLE) {
            out = out.filter(r1 => (
                !res.some(r2 => reservationOverlap(r1, r2))
            ));
        }

        return [
            ...out,
            ...res.map(r => ({
                ...r,
                from: dayjs(r.from),
                to: dayjs(r.to),
            })),
        ]
    },
};

export const patchReservationGroupApi = {
    url: `${BASE_PATH}/reservation-group/:groupId`,
    method: 'PATCH',
    setFunc: ({ cur, req, params }) => {
        const groupId = params.path.groupId;
        const reference = cur.find(r => r.groupId === groupId);
        if (!reference)
            return cur;

        let out = [...cur];
        if (reference.type === RESERVATION_TYPES.DISABLE) {
            out = out.filter(r1 => (
                !req.reservations.some(r2 => reservationOverlap(r1, r2))
            ));
        }

        return [
            ...out.filter(r => r.groupId !== groupId),
            ...req.reservations.map(r => ({
                ...reference,
                ...r,
                text: req.text || reference.text,
            }))
        ];
    },
};

// export const deleteReservationGroupApi = {
//     url: `${BASE_PATH}/reservation-group/:groupId`,
//     method: 'DELETE',
//     setFunc: ({ cur, params }) => (
//         cur.filter(r => r.groupId !== params.path.groupId)
//     ),
// };

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
    setFunc: ({ res }) => res.map(user => ({
        ...user,
        lastActivity: user.lastActivity && dayjs(user.lastActivity)
    })),
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
