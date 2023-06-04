import { configureStore } from '@reduxjs/toolkit';

import { publicTransportReducer } from './features/public-transport';

export const store = configureStore({
    reducer: {
        publicTransport: publicTransportReducer,
    },
});
