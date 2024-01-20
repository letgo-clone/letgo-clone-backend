"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CustomError = require('../errors/CustomError');
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    try {
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
            throw new CustomError(401, "The access token provided is invalid", 'invalid_grant');
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new CustomError(403, "The access token provided is invalid", 'invalid_grant');
            }
            next();
        });
    }
    catch (err) {
        next(err);
    }
};
module.exports = verifyJWT;
