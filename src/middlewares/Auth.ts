import express, { Express, Request, Response } from 'express';
import InputValidation from '../libs/InputValidation';

const app: Express = express();

app.post(
    '/register',
    ...InputValidation.validate({
        firstName: {
            in: 'body',
            notEmpty: true,
            errorMessage: 'first name required.',
            isLength: {
                options: {
                    min: 3,
                },
                errorMessage: 'firstName at least 3 characters.',
            }
        },
        lastName: {
            in: 'body',
            notEmpty: false,
        },
        email: {
            in: 'body',
            notEmpty: true,
            errorMessage: 'email required.',
        },
        password: {
            in: 'body',
            isLength: {
                options: {
                    min: 6,
                },
                errorMessage: 'password at least 6 characters.',
            },
            notEmpty: true,
            errorMessage: 'password required.',
        },
        roleId: {
            in: 'body',
            notEmpty: true,
            errorMessage: 'role id required.'
        }
    }),
);

app.post(
    '/login',
    ...InputValidation.validate({
        email: {
            in: 'body',
            isEmail: {
                errorMessage: 'must be a valid email address.',
            },
            notEmpty: true,
            errorMessage: 'email is required.',
        },
        password: {
            in: 'body',
            isLength: {
                options: {
                    min: 6,
                },
                errorMessage: 'password at least 6 characters',
            },
            notEmpty: true,
            errorMessage: 'password is required.',
        }
    }),
);

export default app;