import express, { Express } from 'express';
import InputValidation from '../libs/InputValidation';

const app: Express = express();

app.post(
    '/products',
    ...InputValidation.validate({
        categoryId: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'category id required.',
        },
        name: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'product name required.',
        },
        status: {
            notEmpty: true,
            in: 'body',
            default: true,
            errorMessage: 'status required.',
            isBoolean: {
                errorMessage: 'status must be boolean.',
            },
        },
        price: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'price required.',
            isNumeric: {
                errorMessage: 'price must be numeric.',
            },
        },
        description: {
            notEmpty: true,
            in: 'body',
            isString: {
                errorMessage: 'description must be string.',
            },
            errorMessage: 'description required.',
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
                errorMessage: 'product id required.',
            },
        },
        categoryId: {
            notEmpty: true,
            in: 'params',
            isEmpty: {
                errorMessage: 'category id required.',
            },
        },
        name: {
            notEmpty: true,
            in: 'body',
            isEmpty: {
                errorMessage: 'product name required.',
            },
        },
        status: {
            notEmpty: true,
            in: 'body',
            default: true,
            isEmpty: {
                errorMessage: 'status required.',
            },
            isBoolean: {
                errorMessage: 'status must be boolean.',
            },
        },
        price: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'price required.',
            isNumeric: {
                errorMessage: 'price must be numeric.',
            },
        },
        description: {
            notEmpty: false,
            in: 'body',
            isString: {
                errorMessage: 'description must be string.'
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
                errorMessage: 'product id required.',
            },
        },
    })
);

export default app;