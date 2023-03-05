import express from 'express';

import { router } from './router';

const app = express();
const port = process.env.SERVER_PORT || 3080;

app.use('/api', router);

// Vercel's Serverless Functions don't need app.listen, just exported app
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server listening on the port::${port}`);
    });
}

export default app;
