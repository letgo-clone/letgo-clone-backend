"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = require('../config/allowedOrigins');
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
};
module.exports = credentials;
