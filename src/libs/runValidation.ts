import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default (req: Request, res: Response, next: NextFunction): void => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errorMessage: result.array() });
    } else {
        next();
    }
}