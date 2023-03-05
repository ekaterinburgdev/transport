import express from 'express';

import { router } from './router';

export const app = express();
const port = process.env.SERVER_PORT || 3080;

app.use('/api', router);

if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server listening on the port::${port}`);
    });
}
