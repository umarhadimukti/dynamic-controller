import dynamicController from '../controllers/DynamicController';
import express, { Router, Request, Response } from 'express';
import { Model } from 'mongoose';
import authMiddleware from '../middlewares/JwtAuth';

/**
 * 
 * @file - this file used for load models
 */

const dynamicRoute = (model: Model<any>): Router => {
    const router: Router = express.Router();
    const controller = new dynamicController(model);

    router.get('/', authMiddleware, (req: Request, res: Response) => {
        controller.index(req, res);
    });
    router.get('/:id', (req: Request, res: Response) => {
        controller.show(req, res)
    });
    router.post('/', (req: Request, res: Response) => {
        controller.store(req, res)
    });
    router.put('/:id', (req: Request, res: Response) => {
        controller.update(req, res)
    });
    router.delete('/:id', (req: Request, res: Response) => {
        controller.delete(req, res)
    });
    
    return router;
}

export default dynamicRoute;