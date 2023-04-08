import express, { Request, Response } from 'express';

import { masstransRouter } from './masstrans';

export const router = express.Router();

router.use('/masstrans', masstransRouter);

router.get('/one', function (_: Request, res: Response) {
    res.json({ data: 'test' });
})