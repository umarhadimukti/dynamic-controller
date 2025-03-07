import dynamicRoute from "../routes/dynamicRoute";
import express, { Express } from "express";

const app: Express = express();

import Category from "./Category";
app.use('/categories', dynamicRoute(Category));

import Product from "./Product";
app.use('/products', dynamicRoute(Product));

export default app;