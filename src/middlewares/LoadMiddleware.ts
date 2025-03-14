import express, { Express } from 'express';
import Category from './Category';
import Product from './Product';
import Auth from './Auth';

const app: Express = express();

app.use('/', Category);
app.use('/', Product);

app.use('/', Auth);

export default app;