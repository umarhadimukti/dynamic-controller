
import ModuleController from "../controllers/ModuleController";
import express, { Request, Response, Express } from "express";

const app: Express = express();
const moduleController: ModuleController = new ModuleController;

app.post('/system/modules', (req: Request, res: Response): void => {
    moduleController.createModel(req, res);
});

export default app;