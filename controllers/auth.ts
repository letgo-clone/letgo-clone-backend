import express, { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');
require('dotenv').config();

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
                            "UserInfo": {
                                "username": 'public'
                            }
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
            }

        }

    } catch(err) {
        next(err);
    }

}