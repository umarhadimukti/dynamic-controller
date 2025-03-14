import { checkSchema, Result, Schema, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

class InputValidation
{
    public validate = (schema: Schema) => {
        return [
            checkSchema(schema),
            (req: Request, res: Response, next: NextFunction): void => {
                try {
                    const result: Result = validationResult(req);
                    if (!result.isEmpty()) {
                        res.status(400).json({
                            status: false,
                            message: 'bad request: input not valid.',
                            error: result.array(),
                        });
                        return;
                    }
                    next();
                } catch (err) {
                    res.status(500).json({
                        status: false,
                        message: 'internal server error',
                        error: err instanceof Error ? err.message : 'unknown error',
                    });
                }
            }
        ];
    }
}

export default new InputValidation;