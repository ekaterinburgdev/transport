import { createContext } from 'react';

import { StrapiStop } from 'transport-common/types/strapi';

const routesDefault = {
    tramsRoutes: {},
    tramsPoints: {},
    trollsRoutes: {},
    trollsPoints: {},
    stops: [],
};

export type RoutesContextType = {
    tramsRoutes: {};
    tramsPoints: {};
    trollsRoutes: {};
    trollsPoints: {};
    stops: StrapiStop[];
};

export const RoutesContext = createContext<RoutesContextType>(routesDefault);
