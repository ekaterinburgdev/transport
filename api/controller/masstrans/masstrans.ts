import { Request, Response } from 'express';

import { ClientUnit } from 'transport-common/types/masstrans';

import { EkaterinburgRfModel } from '../../model/ekaterinburg-rf/ekaterinburg-rf';
import { isValueInObject } from '../../utils/is-value-in-object';

import { MasstransService } from '../../service/masstrans/masstrans';

const ekaterinburgRfModel = new EkaterinburgRfModel();
const masstransService = new MasstransService();

export class MasstransController {
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

        const units = masstransService.processUnitData(unitsRaw);

        res.json({ data: units });
    }

    async getAllUnits(_: Request, res: Response) {
        const unitsRaw = await ekaterinburgRfModel.getAllUnits();

        const units = masstransService.processUnitData(unitsRaw);

        res.json({ data: units });
    }

    async getRoute(req: Request, res: Response) {
        const { id } = req.params;

        if (!Number(id)) {
            res.sendStatus(400);

            return;
        }

        const routeRaw = await ekaterinburgRfModel.getRoute(id);

        const route = masstransService.processRouteData(routeRaw);

        res.json({ data: route });
    }

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

        const stopInfo = masstransService.processStopInfoData(stopInfoRaw);

        res.json({ data: stopInfo });
    }

    async getUnitInfo(req: Request, res: Response) {
        const { unitId } = req.params;

        const arriveInfoRaw = await ekaterinburgRfModel.getUnitArrive(unitId);

        if (!arriveInfoRaw) {
            throw new Error('No response from ekaterinburg.rf about arrive info');
        }

        const arriveInfo = masstransService.processUnitArrive(arriveInfoRaw);

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

        const route = masstransService.processRouteData(routeRaw);

        const unitInfo = masstransService.processUnitInfo(route, arriveInfo);

        res.json({
            data: unitInfo,
        });
    }
}
