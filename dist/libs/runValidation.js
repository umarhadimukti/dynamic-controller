"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
// this file is no longer in use
// this file was previously used for the initial design of the check schema in the middleware file
exports.default = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
    }
    else {
        next();
    }
};
//# sourceMappingURL=runValidation.js.map