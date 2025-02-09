import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection';
import dynamicRoute from './routes/api';
import Category from './models/Category';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect db
connectDB();

// middleware routes
app.use('/categories', dynamicRoute(Category));

app.listen(port, () => console.log(`server running at port ${ port }`));