import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection';
import LoadModels from './models/LoadModels';
import LoadMiddleware from './middlewares/LoadMiddleware';
import SystemRoutes from './system/routes/system';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect db
connectDB();

// middleware express-validator (for sanitazion input)
app.use(LoadMiddleware);

// middleware routes
app.use(SystemRoutes); // module generator
app.use(LoadModels); // common route

app.listen(port, () => console.log(`server running at port ${ port }`));