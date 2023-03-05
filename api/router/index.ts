import express from 'express';

import { helloWorldRouter } from './hello-world';

export const router = express.Router();

router.use('/hello', helloWorldRouter);
