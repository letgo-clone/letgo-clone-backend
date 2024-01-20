"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = require('../config/allowedOrigins');
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || origin !== '') {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};
exports.default = corsOptions;
