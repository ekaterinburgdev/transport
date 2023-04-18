import { createContext } from 'react';

import { StrapiStop } from 'transport-common/types/strapi';

export type RoutesContextType = {
    stops: StrapiStop[];
};

const routesDefault: RoutesContextType = {
    stops: [],
};

export const RoutesContext = createContext<RoutesContextType>(routesDefault);
