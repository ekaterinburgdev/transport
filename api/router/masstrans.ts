import express from 'express';

import { controllerLayer } from '../controller/index';

export const masstransRouter = express.Router();

masstransRouter.get('/all-units', controllerLayer.masstrans.getAllUnits);
masstransRouter.get('/:unit', controllerLayer.masstrans.getUnit);
masstransRouter.get('/route/:id', controllerLayer.masstrans.getRoute);
masstransRouter.get('/stop/:stopId', controllerLayer.masstrans.getStopInfo);
masstransRouter.get('/unit/:unitId', controllerLayer.masstrans.getUnitInfo);
