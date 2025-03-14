import express, { Express } from 'express';
import InputValidation from '../libs/InputValidation';

const app: Express = express();

app.post(
    '/categories',
    ...InputValidation.validate({
        name: { notEmpty: true, errorMessage: 'category name required.' },
        status: { notEmpty: true, errorMessage: 'status required.' }
    })
);
app.put(
    '/categories/:id',
    ...InputValidation.validate({
        id: {
            notEmpty: true,
            errorMessage: 'category id required.',
            in: 'params',
        },
        name: {
            notEmpty: true,
            errorMessage: 'category name required.',
            in: 'body',
            isLength: {
                options: { min: 3 },
                errorMessage: 'category name at least 3 characters.',
            }
        },
        status: {
            notEmpty: true,
            in: 'body',
            errorMessage: 'status required.',
            isBoolean: {
                errorMessage: 'status must be boolean.',
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
            errorMessage: 'category id required',
        },
    })
);

export default app;