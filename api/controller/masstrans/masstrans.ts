import { Request, Response } from 'express';

import { EkaterinburgRfModel } from '../../model/ekaterinburg-rf/ekaterinburg-rf.js';

import { processUnitData } from './masstrans.helpers.js';

const ekaterinburgRfModel = new EkaterinburgRfModel();

export const masstransController = {
    async getBuses(_: Request, res: Response) {
        const busesRaw = await ekaterinburgRfModel.getBuses();

        if (!busesRaw) {
            throw new Error('No response from ekaterinburg.rf');
        }

        // const buses = processUnitData(busesRaw);

        res.json({ data: busesRaw });
    },

    async getTrolls(_: Request, res: Response) {
        const trollsRaw = await ekaterinburgRfModel.getTrolls();

        if (!trollsRaw) {
            throw new Error('No response from ekaterinburg.rf');
        }

        // const trolls = processUnitData(trollsRaw);

        res.json({ data: trollsRaw });
    },

    async getTrams(_: Request, res: Response) {
        const tramsRaw = await ekaterinburgRfModel.getTrams();

        if (!tramsRaw) {
            throw new Error('No response from ekaterinburg.rf');
        }

        // const trams = processUnitData(tramsRaw);

        res.json({ data: tramsRaw });
    },

    async getAll(_: Request, res: Response) {
        const unitsRaw = await ekaterinburgRfModel.getAllUnits();

        // const units = processUnitData(unitsRaw);

        res.json({ data: unitsRaw });
    },
};
