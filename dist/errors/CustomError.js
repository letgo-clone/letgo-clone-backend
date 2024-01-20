"use strict";
class CustomError extends Error {
    constructor(statusCode, message, type) {
        super(message);
        this.name = this.constructor.name;
        this.type = type;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
module.exports = CustomError;
