import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

const CustomError = require('../errors/CustomError');

const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader: string  = req.headers.authorization || '';
    try {
        if (!authHeader?.startsWith('Bearer ')) throw new CustomError(401, "The access token provided is invalid", 'invalid_grant');
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err: Error | any, decoded: any) => {
                if (err) {
                    throw new CustomError(403, "The access token provided is invalid", 'invalid_grant');
                }
                next();
            }
        );

    } catch (err) {
        next(err)
    }
}

module.exports = verifyJWT;