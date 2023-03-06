import express from 'express';

import { createMasstransController } from '../controller/masstrans/masstrans.js';

export function createMasstransRouter() {
    const masstransRouter = express.Router();
    const masstransController = createMasstransController();

    masstransRouter.get('/all-units', masstransController.getAll);
    masstransRouter.get('/bus', masstransController.getBuses);
    masstransRouter.get('/troll', masstransController.getTrolls);
    masstransRouter.get('/tram', masstransController.getTrams);

    return masstransRouter;
}
