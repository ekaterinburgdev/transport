import express from 'express';

import { masstransController } from '../controller/masstrans/masstrans';

export const masstransRouter = express.Router();

masstransRouter.get('/all-units', masstransController.getAllUnits);
masstransRouter.get('/:unit', masstransController.getUnit);
masstransRouter.get('/route/:id', masstransController.getRoute);
masstransRouter.get('/stop/:stopId', masstransController.getStopInfo);
masstransRouter.get('/unit/:unitId', masstransController.getUnitInfo);
