import { Request, Response } from 'express';

import { EkaterinburgRfModel } from '../../model/ekaterinburg-rf/ekaterinburg-rf.js';

import { processUnitData } from './masstrans.helpers.js';

export function createMasstransController() {
    const ekaterinburgRfModel = new EkaterinburgRfModel();

    return {
        async getBuses(_: Request, res: Response) {
            const busesRaw = await ekaterinburgRfModel.getBuses();

            if (!busesRaw) {
                throw new Error('No response from ekaterinburg.rf');
            }

            const buses = processUnitData(busesRaw);

            res.json({ data: buses });
        },

        async getTrolls(_: Request, res: Response) {
            const trollsRaw = await ekaterinburgRfModel.getTrolls();

            if (!trollsRaw) {
                throw new Error('No response from ekaterinburg.rf');
            }

            const trolls = processUnitData(trollsRaw);

            res.json({ data: trolls });
        },

        async getTrams(_: Request, res: Response) {
            const tramsRaw = await ekaterinburgRfModel.getTrams();

            if (!tramsRaw) {
                throw new Error('No response from ekaterinburg.rf');
            }

            const trams = processUnitData(tramsRaw);

            res.json({ data: trams });
        },

        async getAll(_: Request, res: Response) {
            const unitsRaw = await ekaterinburgRfModel.getAllUnits();

            const units = processUnitData(unitsRaw);

            res.json({ data: units });
        },
    };
}
