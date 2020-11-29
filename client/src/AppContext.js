import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { UPDATE_INTERVALS_SEC } from './updateIntervals';
import dayjs from 'dayjs';
import deepEqual from 'deep-equal';
import { getBaseDataApi } from './api';
import { useApi } from './useApi';
import { useUpdateEffect } from './useUpdateEffect';

export const appContext = React.createContext();

export function AppContextProvider({ children }) {

    const [config, setConfig] = useState();
    const [courts, setCourts] = useState();
    const [templates, setTemplates] = useState();

    const setBaseData = useCallback(getResult => {
        const { config, courts, templates } = getResult(null);
        setConfig(cur => deepEqual(cur, config) ? cur : config);
        setTemplates(cur => deepEqual(cur, templates) ? cur : templates);
        setCourts(cur => deepEqual(cur, courts) ? cur : courts);
    }, []);

    const [getBaseDataState, getBaseData] = useApi(getBaseDataApi, setBaseData, true); 
    useUpdateEffect(getBaseData, UPDATE_INTERVALS_SEC.BASE_DATA);

    useEffect(() => {
        dayjs.tz.setDefault(config?.timeZone);
    }, [config?.timeZone])

    const value = useMemo(() => ({
        config,
        courts,
        templates,
        setConfig,
        setCourts,
        setTemplates,
        state: getBaseDataState,
        reload: getBaseData,
    }), [
        config,
        courts,
        templates,
        getBaseDataState,
        getBaseData,
    ]);

    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    );
}