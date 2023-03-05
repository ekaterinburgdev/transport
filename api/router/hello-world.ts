import express from 'express';

export const helloWorldRouter = express.Router();

helloWorldRouter.get('/', (req, res) => {
    res.send('world!');
});
