"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class InputValidation {
    validate = (schema) => {
        return [
            (0, express_validator_1.checkSchema)(schema),
            (req, res, next) => {
                try {
                    const result = (0, express_validator_1.validationResult)(req);
                    if (!result.isEmpty()) {
                        res.status(400).json({
                            status: false,
                            message: 'bad request: input not valid.',
                            error: result.array(),
                        });
                        return;
                    }
                    next();
                }
                catch (err) {
                    res.status(500).json({
                        status: false,
                        message: 'internal server error',
                        error: err instanceof Error ? err.message : 'unknown error',
                    });
                }
            }
        ];
    };
}
exports.default = new InputValidation;
//# sourceMappingURL=InputValidation.js.map