import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEmpty, uniq } from 'lodash';

import { massTransApi } from 'api/masstrans/masstrans';
import {
    SetCurrentStopPayload,
    SetCurrentVehiclePayload,
    SetStopsPayload,
    State,
    CurrentStopPayload,
    CurrentVehiclePayloadWithOptions,
    CurrentVehiclePayload,
    CurrentStopPayloadWithOptions,
} from 'common/types/state';

import { initialState } from '../constants/public-transport';

const SLICE_NAME = 'publicTransport';

function isCurrentVehiclePayload(obj: unknown): obj is CurrentVehiclePayload {
    return Boolean(
        (obj as CurrentVehiclePayload).num &&
            (obj as CurrentVehiclePayload).routeId &&
            (obj as CurrentVehiclePayload).routeDirection &&
            (obj as CurrentVehiclePayload).type,
    );
}

export const setCurrentVehicle = createAsyncThunk(
    `${SLICE_NAME}/setCurrentVehicle`,
    async (
        currentVehiclePayload: CurrentVehiclePayloadWithOptions,
    ): Promise<SetCurrentVehiclePayload> => {
        const { shouldClear = true, ...currentVehicle } = currentVehiclePayload || {};

        if (!isCurrentVehiclePayload(currentVehicle)) {
            return {
                currentVehicle: null,
                currentRoute: null,
                shouldClear,
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
            shouldClear,
        };
    },
);

export const setCurrentStop = createAsyncThunk(
    `${SLICE_NAME}/setCurrentStop`,
    async (currentStopPayload: CurrentStopPayloadWithOptions): Promise<SetCurrentStopPayload> => {
        const { currentStop, shouldClear = true } = currentStopPayload || {};

        if (!currentStop) {
            return {
                currentStop,
                stopInfo: [],
                shouldClear,
            };
        }

        const stopInfo = await massTransApi.getStopInfo(currentStop);

        return {
            currentStop,
            stopInfo,
            shouldClear,
        };
    },
);

const publicTransportSlice = createSlice({
    name: SLICE_NAME,
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
                const { currentVehicle, currentRoute, shouldClear } = action.payload;

                state.currentVehicle = currentVehicle;
                state.currentRoute = currentRoute;

                if (!currentRoute) {
                    state.vehicleStops = [];

                    return;
                }

                if (!shouldClear) {
                    return;
                }

                state.currentStop = null;
                state.stopInfo = [];
                state.stopVehicles = [];

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
                const { currentStop, stopInfo, shouldClear } = action.payload;

                const stopVehicles = uniq(
                    stopInfo?.map((info) => ({
                        route: info.route,
                        type: info.type,
                        routeDirection: info.routeDirection,
                    })) || [],
                );

                state.currentStop = currentStop;
                state.stopInfo = stopInfo;
                state.stopVehicles = stopVehicles;

                if (!shouldClear) {
                    return;
                }

                state.currentVehicle = null;
                state.currentRoute = null;
                state.vehicleStops = [];
            },
        );
    },
});

export const { clearCurrent, setStops } = publicTransportSlice.actions;

export const publicTransportReducer = publicTransportSlice.reducer;
