import dynamicRoute from "../routes/dynamicRoute";
import express, { Express } from "express";

const app: Express = express();

import Category from "./Category";
app.use('/categories', dynamicRoute(Category));

import Product from "./Product";
app.use('/products', dynamicRoute(Product));

import User from "./User";
app.use('/users', dynamicRoute(User));

import MfProposal from "./MfProposal";
app.use('/proposals', dynamicRoute(MfProposal));

import MfProduct from "./MfProduct";
app.use('/mf-products', dynamicRoute(MfProduct));

export default app;