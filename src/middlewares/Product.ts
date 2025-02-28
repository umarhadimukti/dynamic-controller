import express, { Express } from 'express';
import { checkSchema } from 'express-validator';
import runValidation from '../libs/runValidation';

const app: Express = express();

app.post(
    '/products',
    checkSchema({
        categoryId: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'kategori id harus diisi',
        },
        name: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'nama produk harus diisi',
        },
        status: {
            notEmpty: true,
            in: 'body',
            default: true,
            errorMessage: 'status harus diisi',
            isBoolean: {
                errorMessage: 'status harus bernilai (benar/salah)',
            },
        },
        price: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'harga harus diisi',
            isNumeric: {
                errorMessage: 'harga harus numerik',
            },
        },
        description: {
            notEmpty: true,
            in: 'body',
            isString: {
                errorMessage: 'deskripsi harus karakter',
            },
            errorMessage: 'deskripsi harus diisi',
        },
    }),
    runValidation,
);

app.put(
    '/products/:id',
    checkSchema({
        id: {
            notEmpty: true,
            in: 'params',
            isEmpty: {
                errorMessage: 'produk id harus diisi',
            },
        },
        categoryId: {
            notEmpty: true,
            in: 'params',
            isEmpty: {
                errorMessage: 'kategori id harus diisi',
            },
        },
        name: {
            notEmpty: true,
            in: 'body',
            isEmpty: {
                errorMessage: 'nama produk harus diisi',
            },
        },
        status: {
            notEmpty: true,
            in: 'body',
            default: true,
            isEmpty: {
                errorMessage: 'status harus diisi',
            },
            isBoolean: {
                errorMessage: 'status harus bernilai (benar/salah)',
            },
        },
        price: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'harga harus diisi',
            isNumeric: {
                errorMessage: 'harga harus numerik',
            },
        },
        description: {
            notEmpty: false,
            in: 'body',
            isString: {
                errorMessage: 'deskripsi harus karakter'
            },
        },
    }),
    runValidation,
);
app.delete(
    '/products/:id',
    checkSchema({
        id: {
            notEmpty: true,
            in: 'params',
            isEmpty: {
                errorMessage: 'produk id harus diisi',
            },
        },
    }),
    runValidation,
);

export default app;