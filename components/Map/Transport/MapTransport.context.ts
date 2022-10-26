import { createContext } from 'react';

const routesDefault = {
    tramsRoutes: {},
    tramsStations: {},
    tramsPoints: {},
    trollsRoutes: {},
    trollsStations: {},
    trollsPoints: {},
};

export const RoutesContext = createContext(routesDefault);
