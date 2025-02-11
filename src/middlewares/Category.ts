import express, { Express } from 'express';
import { checkSchema } from 'express-validator';
import runValidation from '../libs/runValidation';

const app: Express = express();

app.post(
    '/categories',
    checkSchema({
        name: { notEmpty: true, errorMessage: 'nama kategori harus diisi.' },
        status: { notEmpty: true, errorMessage: 'status harus diisi.' },
    }),
    runValidation
);

export default app;