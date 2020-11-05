import React, { useEffect, useMemo, useState } from 'react';

export const appContext = React.createContext();

export function AppContextProvider({ children }) {

    const [courts, setCourts] = useState([]);
    const [visibleHours, setVisibleHours] = useState([]);
    const [title, setTitle] = useState();

    useEffect(() => {
        (async () => {
            setTitle('Tennisclub Beispiel');

            setCourts(['Platz 1', 'Platz 2']);
            // setCourts(['Platz 1']);
            // setCourts(['Platz 1', 'Platz 2', 'Platz 3', 'Platz 4']);


            const fromTilHours = [8, 22];
            const visibleHours = [];
            for (let i = fromTilHours[0]; i < fromTilHours[1]; ++i)
                visibleHours.push(i);
            setVisibleHours(visibleHours);

        })();
    }, []);

    const value = useMemo(() => ({
        courts,
        visibleHours,
        title,
    }), [
        courts,
        visibleHours,
        title,
    ]);

    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    );
}