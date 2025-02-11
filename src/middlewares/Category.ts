import express, { Express } from 'express';
import { checkSchema } from 'express-validator';
import runValidation from '../libs/runValidation';

const app: Express = express();

app.post(
    '/categories',
    checkSchema({
        name: { notEmpty: true },
        status: { notEmpty: true },
    }),
    runValidation
);

export default app;