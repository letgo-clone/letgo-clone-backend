import express, { Request, Response, NextFunction } from 'express';
const CustomError = require('../errors/CustomError');

const {advertdata} = require('../models/dummy');

exports.getActualAdvert = async function (req: Request, res: Response, next: NextFunction) {
    try {
        return res.status(200).json(advertdata.data);

    } catch(err) {
        next(err); 
    }
}