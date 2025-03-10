import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// this file is no longer in use
// this file was previously used for the initial design of the check schema in the middleware file

export default (req: Request, res: Response, next: NextFunction): void => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
    } else {
        next();
    }
}