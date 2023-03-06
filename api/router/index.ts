import express from 'express';

import { createMasstransRouter } from './masstrans.js';

export const router = express.Router();

const masstransRouter = createMasstransRouter();
router.use('/masstrans', masstransRouter);
