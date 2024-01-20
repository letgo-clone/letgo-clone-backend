"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* const { logEvents } = require('./logEvents'); */
const errorHandler = (err, req, res, next) => {
    /* logEvents(`${err.name}: ${err.message}`, 'errLog.txt'); */
    if (err.type && err.message) {
        res.status(err.statusCode).json({ 'error': err.type, 'error_description': err.message });
    }
    else if (!err.type && err.message) {
        res.status(err.statusCode).json({ 'error': { message: err.message } });
    }
    else {
        res.status(err.statusCode).json({ 'error': { message: err.statusCode } });
    }
};
module.exports = errorHandler;
