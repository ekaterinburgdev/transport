import { Request, Response } from 'express';

import { ClientUnit, UnitArriveStop } from 'transport-common/types/masstrans';

import { EkaterinburgRfModel } from '../../model/ekaterinburg-rf/ekaterinburg-rf';
import { isValueInObject } from '../../utils/is-value-in-object';

import {
    processUnitData,
    processRouteData,
    processStopInfoData,
    processUnitArrive,
} from './masstrans.helpers';

const ekaterinburgRfModel = new EkaterinburgRfModel();

export const masstransController = {
    async getUnit(req: Request, res: Response) {
        const { unit } = req.params;

        if (!isValueInObject(ClientUnit, unit)) {
            res.sendStatus(400);

            return;
        }

        const unitsRaw = await ekaterinburgRfModel.getUnitByType(unit as ClientUnit);

        if (!unitsRaw) {
            throw new Error('No response from ekaterinburg.rf');
        }

        const units = processUnitData(unitsRaw);

        res.json({ data: units });
    },

    async getAllUnits(_: Request, res: Response) {
        const unitsRaw = await ekaterinburgRfModel.getAllUnits();

        const units = processUnitData(unitsRaw);

        res.json({ data: units });
    },

    async getRoute(req: Request, res: Response) {
        const { id } = req.params;

        if (!Number(id)) {
            res.sendStatus(400);

            return;
        }

        const routeRaw = await ekaterinburgRfModel.getRoute(id);

        const route = processRouteData(routeRaw);

        res.json({ data: route });
    },

    async getStopInfo(req: Request, res: Response) {
        const { stopId } = req.params;

        if (!parseInt(stopId, 10)) {
            res.sendStatus(400);

            return;
        }

        const stopInfoRaw = await ekaterinburgRfModel.getStopInfo(stopId);

        if (!stopInfoRaw) {
            throw new Error('No response from ekaterinburg.rf');
        }

        const stopInfo = processStopInfoData(stopInfoRaw);

        res.json({ data: stopInfo });
    },

    async getUnitInfo(req: Request, res: Response) {
        const { unitId } = req.params;

        const arriveInfoRaw = await ekaterinburgRfModel.getUnitArrive(unitId);

        if (!arriveInfoRaw) {
            throw new Error('No response from ekaterinburg.rf about arrive info');
        }

        const arriveInfo = processUnitArrive(arriveInfoRaw);

        if (!arriveInfo.length) {
            res.json({
                data: [],
            });

            return;
        }

        const routeRaw = await ekaterinburgRfModel.getRoute(arriveInfo[0].routeId);

        if (!routeRaw) {
            throw new Error('No response from ekaterinburg.rf about route');
        }

        const route = processRouteData(routeRaw);

        const currentRace = route.races.find(
            (race) => race.raceType === arriveInfo[0].routeDirection,
        );

        if (!currentRace) {
            throw new Error('No race of current route direction');
        }

        const { stops } = currentRace;

        const result: UnitArriveStop[] = [...stops];
        const nextStopIndex = result.findIndex((stop) => stop.stopId === arriveInfo[0].stopId);

        const arriveInfoWithCoords = arriveInfo.slice(0, result.length).map((info, idx) => ({
            ...info,
            coords: result[nextStopIndex + idx]?.coords,
        }));

        result.splice(nextStopIndex, arriveInfoWithCoords.length, ...arriveInfoWithCoords);

        res.json({
            data: result,
        });
    },
};
