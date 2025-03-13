
import User from "../../models/User";
import AuthController from "../controllers/AuthController";
import ModuleController from "../controllers/ModuleController";
import express, { Request, Response, Express } from "express";

const app: Express = express();
const moduleController: ModuleController = new ModuleController;
const authController = new AuthController(User);

app.post('/system/modules', (req: Request, res: Response): void => {
    moduleController.createModel(req, res);
});

app.post('/register', (req: Request, res: Response): void => {
    authController.register(req, res);
});

app.post('/login', (req: Request, res: Response): void => {
    authController.login(req, res);
})

app.post('/refresh-token/:token', (req: Request, res: Response): void => {
    authController.refreshToken(req, res);
})

export default app;