import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniq } from 'lodash';

import { massTransApi } from 'api/masstrans/masstrans';
import {
    SetCurrentStopPayload,
    SetCurrentVehiclePayload,
    SetStopsPayload,
    CurrentVehiclePayload,
    State,
    CurrentStopPayload,
} from 'common/types/state';

import { initialState } from '../constants/public-transport';

export const setCurrentVehicle = createAsyncThunk(
    'publicTransport/setCurrentVehicle',
    async (currentVehicle: CurrentVehiclePayload): Promise<SetCurrentVehiclePayload> => {
        if (!currentVehicle) {
            return {
                currentVehicle,
                currentRoute: null,
            };
        }

        const { routeId } = currentVehicle;

        const currentRoute = await massTransApi.getRoute(routeId);

        return {
            currentVehicle,
            currentRoute: {
                ...currentRoute,
                type: currentVehicle.type,
                routeDirection: currentVehicle.routeDirection,
            },
        };
    },
);

export const setCurrentStop = createAsyncThunk(
    'publicTransport/setCurrentStop',
    async (currentStop: CurrentStopPayload): Promise<SetCurrentStopPayload> => {
        if (!currentStop) {
            return {
                currentStop,
                stopInfo: [],
            };
        }

        const stopInfo = await massTransApi.getStopInfo(currentStop);

        return {
            currentStop,
            stopInfo,
        };
    },
);

const publicTransportSlice = createSlice({
    name: 'publicTransport',
    initialState,
    reducers: {
        setStops(state: State['publicTransport'], action: PayloadAction<SetStopsPayload>) {
            const stops = action.payload;

            state.stops = stops;
        },
        clearCurrent(state: State['publicTransport']) {
            state.currentStop = null;
            state.currentVehicle = null;
            state.currentRoute = null;

            state.stopInfo = [];
            state.stopVehicles = [];
            state.vehicleStops = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            setCurrentVehicle.fulfilled,
            (state, action: PayloadAction<SetCurrentVehiclePayload>) => {
                const { currentVehicle, currentRoute } = action.payload;

                state.currentVehicle = currentVehicle;
                state.currentRoute = currentRoute;

                state.currentStop = null;
                state.stopInfo = [];
                state.stopVehicles = [];

                if (!currentRoute) {
                    state.vehicleStops = [];

                    return;
                }

                const racesInDirection = currentRoute.races.find(
                    (race) => race.raceType === currentVehicle.routeDirection,
                );
                const vehicleStops = racesInDirection?.stops.map((stop) => stop.stopId) || [];

                state.vehicleStops = vehicleStops;
            },
        );

        builder.addCase(
            setCurrentStop.fulfilled,
            (state, action: PayloadAction<SetCurrentStopPayload>) => {
                const { currentStop, stopInfo } = action.payload;

                const stopVehicles = uniq(
                    stopInfo.map((info) => ({
                        route: info.route,
                        type: info.type,
                        routeDirection: info.routeDirection,
                    })),
                );

                state.currentStop = currentStop;
                state.stopInfo = stopInfo;
                state.stopVehicles = stopVehicles;

                state.currentVehicle = null;
                state.currentRoute = null;
                state.vehicleStops = [];
            },
        );
    },
});

export const { clearCurrent, setStops } = publicTransportSlice.actions;

export const publicTransportReducer = publicTransportSlice.reducer;
