import express, { Express, Response, Request } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db/connection';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect db
connectDB();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ name: 'umarhadimukti', data: { testing: 'testing' } });
});

app.listen(port, () => console.log(`server running at port ${ port }`));