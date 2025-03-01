import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection';
import CategoryMiddleware from './middlewares/Category';
import ProductMiddleware from './middlewares/Product';
import LoadModels from './models/LoadModels';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect db
connectDB();

// middleware express-validator (for sanitazion input)
app.use(CategoryMiddleware);
app.use(ProductMiddleware);

// middleware routes
app.use(LoadModels);

app.listen(port, () => console.log(`server running at port ${ port }`));