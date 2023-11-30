import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const redis = require('../helpers/redis');
const pool = require('../helpers/postgre');

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

                if(grant_type == 'password') {
                    const username = req.body.username;
                    const password = req.body.password;

                    if (!username || !password) {
                        throw new CustomError(401, "Email adresiniz veya şifreniz yanlış olabilir.", 'invalid_grant');
                    }

                    const sqlQuery = "SELECT * FROM users WHERE email = $1";
                    const data = await pool.query(sqlQuery, [username]);
                    const user = data.rows[0];

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
                        
                        const user_id = user.id;

                        const currentUser = {
                            access_token,
                            refresh_token,
                            username,
                            user_id
                        };
                        
                        redis.setValue('currentUser', expires_in, currentUser); 

                        res.status(200).json({ access_token, expires_in, refresh_token, token_type: 'Bearer' });
                    } 
                    else {
                        throw new CustomError(401, "Email adresiniz veya şifreniz yanlış olabilir.", 'invalid_grant');
                    }
                   
                }
                else if(grant_type == 'refresh_token'){
                    const refresh_token = req.body.refresh_token;
                    const getRedisData = await redis.RedisClient.get('currentUser');
                    const parseUser = JSON.parse(getRedisData);

                    if (!parseUser) {
                        throw new CustomError(401, "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client", 'invalid_grant');
                    }

                    if (!refresh_token) {
                        throw new CustomError(401);
                    }

                    if (parseUser.refresh_token !== refresh_token) {
                        throw new CustomError(401, "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client", 'invalid_grant');
                    }

                    jwt.verify(
                        refresh_token,
                        process.env.REFRESH_TOKEN_SECRET,
                        (err: Error | any, decoded: any) => {
                            if(err || parseUser.username !== decoded.username) throw new CustomError(403);

                            const access_token = jwt.sign(
                                {
                                    "username": decoded.username
                                },
                                process.env.ACCESS_TOKEN_SECRET,
                                { expiresIn: expires_in }
                            );
                            const refresh_token = jwt.sign(
                                {
                                    "username": decoded.username
                                },
                                process.env.REFRESH_TOKEN_SECRET,
                                { expiresIn: expires_in }
                            );
                            const username = parseUser.username;
                            const user_id = parseUser.user_id
                            
                            const currentUser = {
                                access_token,
                                refresh_token,
                                username,
                                user_id
                            }; 
    
                            redis.setValue('currentUser', expires_in, currentUser); 

                            res.status(200).json({ access_token, expires_in, refresh_token, token_type: 'Bearer' });
                        }
                    )
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