import dynamicRoute from "../routes/dynamicRoute";
import express, { Express } from "express";
import Category from "./Category";
import Product from "./Product";

const app: Express = express();

app.use('/categories', dynamicRoute(Category));
app.use('/products', dynamicRoute(Product));

export default app;