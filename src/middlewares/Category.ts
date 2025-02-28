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
app.put(
    '/categories/:id',
    checkSchema({
        id: {
            notEmpty: true,
            errorMessage: 'id kategori harus di masukkan.',
            in: 'params',
        },
        name: {
            notEmpty: true,
            errorMessage: 'nama kategori harus diisi.',
            in: 'body',
            isLength: {
                options: { min: 3 },
                errorMessage: 'minimal 3 karakter.',
            }
        },
        status: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'status harus diisi.',
            isBoolean: {
                errorMessage: 'tipe data status harus boolean.',
            },
        },
    }),
    runValidation
);
app.delete(
    '/categories/:id',
    checkSchema({
        id: {
            notEmpty: true,
            in: 'params',
            errorMessage: 'id harus dimasukkan',
        },
    }),
    runValidation,
);

export default app;