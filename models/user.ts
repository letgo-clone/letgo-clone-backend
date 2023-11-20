import { Schema, model } from 'mongoose';
const Joi = require('joi');

interface IUser {
    name: string;
    surname: string;
    photo: string;
    email:string;
    about: string;
    phone_number: number;
    password: string;
    date: Date;
    is_verify: boolean;
    is_deleted: boolean;
}

  
const userSchema = new Schema<IUser>({
    name: Joi.string().required().min(3).max(30),
    surname: Joi.string().min(3).max(30).required(),
    photo: Joi.string().required(),
    email: Joi.string().required().min(3).max(30),
    about: Joi.string(),
    phone_number: Joi.number().required(),
    password: Joi.string().required(),
    date: {
        type: Date,
        default: Date.now
    },
    is_verify: { 
        type: Boolean,
        default: true
    },
    is_deleted: {
       type: Boolean,
       default: true 
    },
});


const User = model<IUser>('Users', userSchema);

module.exports = {User};