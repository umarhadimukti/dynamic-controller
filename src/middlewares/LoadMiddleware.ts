import express, { Express } from 'express';
import Category from './Category';
import Product from './Product';

const app: Express = express();

app.use('/', Category);
app.use('/', Product);

export default app;