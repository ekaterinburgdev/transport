import express from 'express';

import { masstransRouter } from './masstrans';

export const router = express.Router();

router.use('/masstrans', masstransRouter);