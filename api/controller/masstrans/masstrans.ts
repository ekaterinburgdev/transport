import { Request, Response } from 'express';

import { ClientUnit } from 'transport-common/types/masstrans';

import { isValueInObject } from '../../utils/is-value-in-object';
import { modelLayer } from '../../model/index';
import { serviceLayer } from '../../service/index';

export class MasstransController {
    async getUnit(req: Request, res: Response) {
        const { unit } = req.params;

        if (!isValueInObject(ClientUnit, unit)) {
            res.sendStatus(400);

            return;
        }

        const unitsRaw = await modelLayer.ekaterinburgRf.getUnitByType(unit as ClientUnit);

        if (!unitsRaw) {
            throw new Error('No response from ekaterinburg.rf');
        }

        const units = serviceLayer.masstrans.processUnitData(unitsRaw);

        res.json({ data: units });
    }

    async getAllUnits(_: Request, res: Response) {
        const unitsRaw = await modelLayer.ekaterinburgRf.getAllUnits();

        const units = serviceLayer.masstrans.processUnitData(unitsRaw);

        res.json({ data: units });
    }

    async getRoute(req: Request, res: Response) {
        const { id } = req.params;

        if (!Number(id)) {
            res.sendStatus(400);

            return;
        }

        const routeRaw = await modelLayer.ekaterinburgRf.getRoute(id);

        const route = serviceLayer.masstrans.processRouteData(routeRaw);

        res.json({ data: route });
    }

    async getStopInfo(req: Request, res: Response) {
        const { stopId } = req.params;

        if (!parseInt(stopId, 10)) {
            res.sendStatus(400);

            return;
        }

        const stopInfoRaw = await modelLayer.ekaterinburgRf.getStopInfo(stopId);

        if (!stopInfoRaw) {
            throw new Error('No response from ekaterinburg.rf');
        }

        const stopInfo = serviceLayer.masstrans.processStopInfoData(stopInfoRaw);

        res.json({ data: stopInfo });
    }

    async getUnitInfo(req: Request, res: Response) {
        const { unitId } = req.params;

        const arriveInfoRaw = await modelLayer.ekaterinburgRf.getUnitArrive(unitId);

        if (!arriveInfoRaw) {
            throw new Error('No response from ekaterinburg.rf about arrive info');
        }

        const arriveInfo = serviceLayer.masstrans.processUnitArrive(arriveInfoRaw);

        if (!arriveInfo.length) {
            res.json({
                data: [],
            });

            return;
        }

        const routeRaw = await modelLayer.ekaterinburgRf.getRoute(arriveInfo[0].routeId);

        if (!routeRaw) {
            throw new Error('No response from ekaterinburg.rf about route');
        }

        const route = serviceLayer.masstrans.processRouteData(routeRaw);

        const unitInfo = serviceLayer.masstrans.processUnitInfo(route, arriveInfo);

        res.json({
            data: unitInfo,
        });
    }
}
