import express from 'express';

import { masstransRouter } from './masstrans.js';

export const router = express.Router();

router.use('/masstrans', masstransRouter);
