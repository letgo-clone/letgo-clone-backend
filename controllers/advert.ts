import express, { Request, Response, NextFunction } from 'express';
const CustomError = require('../errors/CustomError');

const pool = require('../helpers/postgre');
const redis = require('../helpers/redis');
const Image = require('../helpers/uploadImage');

exports.getActualAdvert = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser')
    const currentUser = JSON.parse(getRedisData);

    try {
        let sqlNonAuthQuery;

        if(currentUser?.user_id){

            sqlNonAuthQuery = `
                 SELECT 
                    ad.id, 
                    ad.title, 
                    to_char(ad.created_at,'DD Month') as date, 
                    ad.description,
                    ad.images,
                    ad.price,
                    ad.parameters,
                    u.user_type,
                    ads.display_type,
                    ads.display_name,
                    cy.city,
                    ct.county,
                    CASE
                        WHEN adf.favorite_id IS NULL THEN false
                        ELSE true END
                        AS has_favorite
                FROM 
                    adverts ad 
                LEFT JOIN 
                    users u ON ad.user_id = u.id 
                LEFT JOIN 
                    advert_status ads ON ads.id = ad.status_id 
                LEFT JOIN 
                    cities cy ON cy.id = ad.city_id 
                LEFT JOIN 
                    counties ct ON ct.id = ad.county_id 
                LEFT JOIN
					advert_favorites adf ON adf.advert_id = ad.id
                WHERE 
                    ad.is_deleted = FALSE 
                        AND 
                    ad.is_verify = TRUE 
                        AND 
                    u.is_deleted = FALSE 
                        AND 
                    ads.is_visible = TRUE
            `;
        }else{

            sqlNonAuthQuery = `
                SELECT 
                    ad.id, 
                    ad.title, 
                    to_char(ad.created_at,'DD Month') as date, 
                    ad.description,
                    ad.images,
                    ad.price,
                    ad.parameters,
                    u.user_type,
                    ads.display_type,
                    ads.display_name,
                    cy.city,
                    ct.county 
                FROM 
                    adverts ad 
                LEFT JOIN 
                    users u ON ad.user_id = u.id 
                LEFT JOIN 
                    advert_status ads ON ads.id = ad.status_id 
                LEFT JOIN 
                    cities cy ON cy.id = ad.city_id 
                LEFT JOIN 
                    counties ct ON ct.id = ad.county_id 
                WHERE 
                    ad.is_deleted = FALSE 
                        AND 
                    ad.is_verify = TRUE 
                        AND 
                    u.is_deleted = FALSE 
                        AND 
                    ads.is_visible = TRUE
            `;
        }

        const data = await pool.query(sqlNonAuthQuery);
        const result = data.rows;

        return res.status(200).json(result);

    } catch(err) {
        next(err); 
    }
}

exports.getAdvertDetail = async function (req: Request, res: Response, next: NextFunction) {
    const advert_id = req.params.detail;

    try {
        const sqlQuery = `
            SELECT 
                ad.id, 
                ad.title, 
                to_char(ad.created_at,'DD Month') as date,
                ad.description, 
                ad.images, 
                ad.price, 
                ad.parameters, 
                u.id as userId, 
                u.fullname,
                u.photo,
                u.user_type, 
                ads.display_type, 
                ads.display_name, 
                cy.city, 
                ct.county 
            FROM 
                adverts ad 
            LEFT JOIN 
                users u ON ad.user_id = u.id 
            LEFT JOIN 
                advert_status ads ON ads.id = ad.status_id 
            LEFT JOIN 
                cities cy ON cy.id = ad.city_id 
            LEFT JOIN 
                counties ct ON ct.id = ad.county_id 
            WHERE 
                (ad.is_deleted = FALSE AND ad.is_verify = TRUE) 
            AND 
                (u.is_deleted = FALSE AND ads.is_visible = TRUE) AND ad.id = $1`;

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
    const email =  parseUser.username;
    const title = req.body.title;
    const description = req.body.description;
    const parameters = req.body.parameters;
    const price = req.body.price;
    const city_id = req.body.city_id;
    const county_id = req.body.county_id;
    const advertImages = req.files;

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

        if (!advertImages) {
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

         const advertImagesResponse = await Image.uploadMultipleImages(advertImages, 'members/' + email  + '/adverts/' + title + '/' , title);


        const insertQuery = 'INSERT INTO adverts(title, description, user_id, images, parameters, price, city_id, county_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [title, description, user_id, JSON.stringify(advertImagesResponse), parameters, price, city_id, county_id];

        const status = await pool.query(insertQuery, values);
        const advert_id = status.rows[0].id;
       
        return res.status(201).json({ 'success': 'true' , 'advert_id' : advert_id})
    }catch (err){
        next(err)
    }
}

exports.getLocationCity =  async function (req: Request, res: Response, next: NextFunction) {
    try {
        const data = await pool.query(`
            SELECT 
                * 
            FROM 
                cities
        `);
        const response = data.rows;

        return res.status(200).json(response);

    }catch(err){
        next(err)
    }
}

exports.getCountyForCity =  async function (req: Request, res: Response, next: NextFunction) {
    const city_id = req.params.city_id;

    try {
        const sqlQuery = `
            SELECT 
                id,
                county
            FROM 
                counties
            WHERE
                city_id = $1
        `
        const data = await pool.query(sqlQuery, [city_id]);
        const response = data.rows;

        return res.status(200).json(response);

    }catch(err){
        next(err)
    }
}

exports.patchFavoriteAdvert =  async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser')
    const currentUser = JSON.parse(getRedisData);

    const advertId = req.params.advert_id;
    const userId = currentUser.user_id;
    const op = req.body.op;
    const path = req.body.path;

    try {
        if(path !== 'has_advert_favorite'){
            throw new CustomError(403); 
        }

        const sqlQuery = `
            SELECT 
                favorite_id
            FROM
                advert_favorites
            WHERE 
                user_id = $1
            AND
                advert_id = $2
        `;

        const responseData = await pool.query(sqlQuery, [userId, advertId]);
        const result = responseData.rows[0];

        if(result && op == 'remove'){
            const favoriteId = result.favorite_id;
             const deleteQuery = `
                DELETE FROM
                    advert_favorites
                WHERE
                    favorite_id = $1
            `;
            await pool.query(deleteQuery, [favoriteId]);

            return res.status(202).json({ 'success': true })
        }
        else if (!result && op == 'add'){
            const insertQuery = `
                INSERT INTO
                    advert_favorites
                    (user_id, advert_id) 
                VALUES
                    ($1, $2)
                RETURNING *
            `;
            await pool.query(insertQuery, [userId, advertId]);

            return res.status(201).json({ 'success': true })
        }
        else{
            throw new CustomError(404, "NOT FOUND");
        }
   
    }
    catch (err){
        next(err);
    }
}