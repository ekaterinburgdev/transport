import { Request, Response } from 'express';

import { ClientUnit } from 'transport-common/types/masstrans';

import { EkaterinburgRfModel } from '../../model/ekaterinburg-rf/ekaterinburg-rf';
import { isValueInObject } from '../../utils/is-value-in-object';

import { processUnitData, processRouteData } from './masstrans.helpers';

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
};
