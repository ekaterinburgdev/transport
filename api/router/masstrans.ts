import express from 'express';

import { masstransController } from '../controller/masstrans/masstrans.js';

export const masstransRouter = express.Router();

masstransRouter.get('/all-units', masstransController.getAllUnits);
masstransRouter.get('/:unit', masstransController.getUnit);
