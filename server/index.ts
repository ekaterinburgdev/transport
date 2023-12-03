import express from 'express';

import { router } from './router/index';

const app = express();
const port = process.env.APP_PORT || 3080;

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
