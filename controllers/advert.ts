import express, { Request, Response, NextFunction } from 'express';
const CustomError = require('../errors/CustomError');

const pool = require('../helpers/postgre');
const redis = require('../helpers/redis');

exports.getActualAdvert = async function (req: Request, res: Response, next: NextFunction) {
    try {
        const data = await pool.query(
            "SELECT ad.id, ad.title, to_char(ad.created_at,'DD Month') as date, ad.description, ad.images, ad.price, ad.parameters, u.user_type, ads.display_type, ads.display_name, cy.city, ct.county FROM adverts ad LEFT JOIN users u ON ad.user_id = u.id LEFT JOIN advert_status ads ON ads.id = ad.status_id LEFT JOIN cities cy ON cy.id = ad.city_id LEFT JOIN counties ct ON ct.id = ad.county_id WHERE ad.is_deleted = FALSE AND ad.is_verify = TRUE AND u.is_deleted = FALSE AND ads.is_visible = TRUE"
        );
        const user = data.rows;

        return res.status(200).json(user);

    } catch(err) {
        next(err); 
    }
}

exports.getAdvertDetail = async function (req: Request, res: Response, next: NextFunction) {
    const advert_id = req.params.detail;

    try {
        const sqlQuery = "SELECT ad.id, ad.title, to_char(ad.created_at,'DD Month') as date ,ad.description, ad.images, ad.price, ad.parameters, u.id as userId, u.name, u.surname, u.photo ,u.user_type, ads.display_type, ads.display_name, cy.city, ct.county FROM adverts ad LEFT JOIN users u ON ad.user_id = u.id LEFT JOIN advert_status ads ON ads.id = ad.status_id LEFT JOIN cities cy ON cy.id = ad.city_id LEFT JOIN counties ct ON ct.id = ad.county_id WHERE (ad.is_deleted = FALSE AND ad.is_verify = TRUE) AND (u.is_deleted = FALSE AND ads.is_visible = TRUE) AND ad.id = $1";

        const data = await pool.query(sqlQuery, [advert_id]); 
        const advertDetail = data.rows[0];

        if(advertDetail.length < 1){
            throw new CustomError(404, "veri bulunamadı"); 
        }

        return res.status(200).json(advertDetail);

    } catch(err) {
        next(err); 
    }
}

exports.postAdvert = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser');
    const parseUser = JSON.parse(getRedisData);

    const user_id = parseUser.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const images = req.body.images;
    const parameters = req.body.parameters;
    const price = req.body.price;
    const city_id = req.body.city_id;
    const county_id = req.body.county_id;

    try {
        if (!user_id || user_id == '') {
            throw new CustomError(403, "user_id alanını belirtmelisiniz.");
        }

        if (!title || title == '') {
            throw new CustomError(400, "title alanını belirtmelisiniz.");
        }

        if (!description || description == '') {
            throw new CustomError(400, "description alanını belirtmelisiniz.");
        }

        if (!images) {
            throw new CustomError(400, "images alanını belirtmelisiniz.");
        }

        if (!parameters) {
            throw new CustomError(400, "parameters alanını belirtmelisiniz.");
        }

        if (!price || price == '') {
            throw new CustomError(400, "price alanını belirtmelisiniz.");
        }

        if (!city_id || city_id == '') {
            throw new CustomError(400, "city_id alanını belirtmelisiniz.");
        }

        if (!county_id || county_id == '') {
            throw new CustomError(400, "county_id alanını belirtmelisiniz.");
        }

        const insertQuery = 'INSERT INTO adverts(title, description, user_id, images, parameters, price, city_id, county_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [title, description, user_id, JSON.stringify(images), JSON.stringify(parameters), price, city_id, county_id];

        const status = await pool.query(insertQuery, values);
        const advert_id = status.rows[0].id;
       
        return res.status(201).json({ 'success': 'true' , 'advert_id' : advert_id})
    }catch (err){
        next(err)
    }
}