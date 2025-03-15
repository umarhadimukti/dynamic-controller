
import User from "../../models/User";
import AuthController from "../controllers/AuthController";
import ModuleController from "../controllers/ModuleController";
import express, { Request, Response, Express } from "express";
import OAuthController from "../controllers/OAuthController";

const app: Express = express();
const moduleController: ModuleController = new ModuleController;
const authController = new AuthController(User);
const oAuthController = new OAuthController;

app.post('/system/modules', (req: Request, res: Response): void => {
    moduleController.createModel(req, res);
});

app.post('/register', (req: Request, res: Response): void => {
    authController.register(req, res);
});

app.post('/login', (req: Request, res: Response): void => {
    authController.login(req, res);
});

app.post('/refresh-token/:token', (req: Request, res: Response): void => {
    authController.refreshToken(req, res);
});

app.get('/auth/login', (req: Request, res: Response): void => {
    oAuthController.googleLogin(req, res);
});

app.get('/auth/login/callback', (req: Request, res: Response): void => {
    oAuthController.callbackLogin(req, res);
});

export default app;