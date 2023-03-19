import { Request, Response } from 'express';

import { ClientUnit } from 'transport-common/types/masstrans.js';

import { EkaterinburgRfModel } from '../../model/ekaterinburg-rf/ekaterinburg-rf.js';
import { isValueInObject } from '../../utils/is-value-in-object.js';

import { processUnitData } from './masstrans.helpers.js';

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
};
