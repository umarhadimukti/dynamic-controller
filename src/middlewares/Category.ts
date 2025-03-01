import express, { Express } from 'express';
import InputValidation from '../libs/InputValidation';

const app: Express = express();

app.post(
    '/categories',
    ...InputValidation.validate({
        name: { notEmpty: true, errorMessage: 'nama kategori harus diisi.' },
        status: { notEmpty: true, errorMessage: 'status harus diisi.' }
    })
);
app.put(
    '/categories/:id',
    ...InputValidation.validate({
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
    })
);
app.delete(
    '/categories/:id',
    ...InputValidation.validate({
        id: {
            notEmpty: true,
            in: 'params',
            errorMessage: 'id harus dimasukkan',
        },
    })
);

export default app;