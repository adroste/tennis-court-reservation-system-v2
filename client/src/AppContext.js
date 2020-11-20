import React, { useCallback, useMemo, useState } from 'react';

import { UPDATE_INTERVALS_SEC } from './updateIntervals';
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
        setConfig(config);
        setTemplates(templates);
        setCourts(courts);
    }, []);

    const [getBaseDataState, getBaseData] = useApi(getBaseDataApi, setBaseData, true); 
    useUpdateEffect(getBaseData, UPDATE_INTERVALS_SEC.BASE_DATA);

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