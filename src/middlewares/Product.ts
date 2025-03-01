import express, { Express } from 'express';
import InputValidation from '../libs/InputValidation';

const app: Express = express();

app.post(
    '/products',
    ...InputValidation.validate({
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
    })
);

app.put(
    '/products/:id',
    ...InputValidation.validate({
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
    })
);
app.delete(
    '/products/:id',
    ...InputValidation.validate({
        id: {
            notEmpty: true,
            in: 'params',
            isEmpty: {
                errorMessage: 'produk id harus diisi',
            },
        },
    })
);

export default app;