import express from 'express';

import { masstransController } from '../controller/masstrans/masstrans.js';

export const masstransRouter = express.Router();

masstransRouter.get('/all-units', masstransController.getAll);
masstransRouter.get('/bus', masstransController.getBuses);
masstransRouter.get('/troll', masstransController.getTrolls);
masstransRouter.get('/tram', masstransController.getTrams);
