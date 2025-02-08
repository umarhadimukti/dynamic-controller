import DynamicController from '../controllers/DynamicController';
import express, { Router } from 'express';
import { Document } from 'mongoose';

const dynamicRoute = (model: any) => {
    const router: Router = express.Router();
    const dynamicController: any = new DynamicController(model);

    router.get('/', dynamicController.index);
    router.get('/:id', dynamicController.show);
    router.post('/', dynamicController.create);
    router.put('/:id', dynamicController.update);
    router.delete('/:id', dynamicController.delete);
    
    return router;
}

export default dynamicRoute;