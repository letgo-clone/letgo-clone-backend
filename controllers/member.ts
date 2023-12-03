import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const redis = require('../helpers/redis');
const pool = require('../helpers/postgre');

const CustomError = require('../errors/CustomError');

exports.get_member = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser')
    const currentUser = JSON.parse(getRedisData);

    try {
        if (!currentUser) {
            throw new CustomError(403, "Client authentication failed", 'invalid_client');
        }
        const email = currentUser.username;

        if (!email || email == '') {
            throw new CustomError(403, "Client authentication failed", 'invalid_client');
        }

        const sqlQuery = `
            SELECT 
                u.fullname,
                u.about,
                u.phone_number,
                u.photo, 
                u.email
            FROM 
                users u 
            WHERE 
                u.is_deleted = FALSE 
            AND 
                u.email = $1
            `;

        const data = await pool.query(sqlQuery, [email]); 
        const user = data.rows[0];

        if (!user) {
            throw new CustomError(401, "The user not found", 'access_denied');
        }

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

exports.put_member = async function(req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser')
    const currentUser = JSON.parse(getRedisData);

    const current_email = currentUser.username 
    const user_id = currentUser.user_id

    let fullname = req.body.fullname;
    let email = req.body.email;
    let password = req.body.password;
    let photo = req.body.photo;
    let about = req.body.about;
    let phone_number = req.body.phone_number;

    try {
       const oldDataQuery = `
            SELECT 
                fullname,
                photo,
                email,
                about,
                password,
                phone_number 
            FROM
                users
            WHERE
                email = $1
        `;

        const statusOldData = await pool.query(oldDataQuery, [current_email]);
        const responseOldData = statusOldData.rows[0];
        
        fullname = !fullname || fullname == '' ? responseOldData.fullname : fullname;
        email = !email || email == '' ? responseOldData.email : email;
        photo = !photo || photo == '' ? responseOldData.photo : photo;
        about = !about || about == '' ? responseOldData.about : about;
        phone_number = !phone_number || phone_number == '' ? responseOldData.phone_number : phone_number;
        
        if(!password || password == ''){
            password = responseOldData.password
        }else{
            password = await bcrypt.hashSync(password, 10);
        }
        
        const updateQuery = `
            UPDATE
                users
            SET
                fullname = $1,
                email = $2,
                photo = $3,
                about = $4,
                phone_number = $5,
                password = $6
            WHERE
                id = $7
        `;

        await pool.query(updateQuery, [
            fullname,
            email,
            photo,
            about,
            phone_number,
            password,
            user_id
        ]);

        return res.status(200).json({'success': 'true'});

    }catch (err){
        next(err)
    }
}