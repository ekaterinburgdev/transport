import express from 'express';
import { router } from './router/index';
import { addCorsHeaders } from './utils/add-cors-headers';

const app = express();
const port = process.env.APP_PORT || 3080;


app.use(addCorsHeaders);

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
