import express, { Request, Response, NextFunction } from 'express';
const {Advert} = require("../models/advert");
const {User} = require("../models/user");

const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcrypt");

const redis = require('../helpers/redis');

const CustomError = require('../errors/CustomError');

exports.handleToken = async function (req: Request, res: Response, next: NextFunction) {
    const client_id = req.body.client_id;
    const client_secret = req.body.client_secret;
    const grant_type = req.body.grant_type;
    const expires_in = 7200;

    try {
        if(!client_id || !client_secret){
            throw new CustomError(400, "Client authentication failed", 'invalid_client');
        }
        else
        {
            if ((client_id !== process.env.CLIENT_ID_CLIENT) || (client_secret !== process.env.CLIENT_SECRET_CLIENT)) 
            {
                throw new CustomError(400, "Client authentication failed", 'invalid_client'); 
            }
            else{
                
                if(grant_type === 'client_credentials')
                {
                    const access_token = jwt.sign(
                        {
                            "username": 'public'
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: expires_in }
                    );
                    
                    const currentUser = {
                        access_token
                    };

                    redis.setValue('currentUser', expires_in, currentUser);

                    res.status(200).json({ access_token, expires_in, token_type: 'Bearer', scope : 'user' });
                }
                else if(grant_type == 'password') {
                    const username = req.body.username;
                    const password = req.body.password;

                    if (!username || !password) {
                        throw new CustomError(401, "Email adresiniz veya şifreniz yanlış olabilir.", 'invalid_grant');
                    }

                    const user = await User.findOne({ email: username });
                    
                    if(!user) {
                        throw new CustomError(401, "Email adresiniz veya şifreniz yanlış olabilir.", 'invalid_grant');
                    }

                    const match = await bcrypt.compare(password, user.password);

                    if(match){
                        const access_token = jwt.sign(
                            {
                                "username": username
                            },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: expires_in }
                        );

                        const refresh_token = jwt.sign(
                            {
                                "username": username
                            },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: expires_in }
                        );

                        const currentUser = {
                            access_token,
                            refresh_token,
                            username
                        };

                        redis.setValue('currentUser', expires_in, currentUser); 

                        res.status(200).json({ access_token, expires_in, refresh_token, token_type: 'Bearer' });

                    }
                    else {
                        throw new CustomError(401, "Email adresiniz veya şifreniz yanlış olabilir.", 'invalid_grant');
                    }
                   
                }
                else {
                    throw new CustomError(400, "The authorization grant type is not supported by the authorization server", 'unsupported_grant_type');
                }
            }

        }

    } catch(err) {
        next(err);
    }
}