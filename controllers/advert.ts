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
                    ad.how_status,
                    u.user_type,
                    ads.display_type,
                    ads.display_name,
                    cy.city,
                    ct.county,
                    ai.url as photo,
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
                LEFT JOIN
                    advert_images ai ON ai.advert_id = ad.id
                WHERE 
                    ad.is_deleted = FALSE 
                        AND 
                    ad.is_visible = TRUE 
                        AND 
                    u.is_deleted = FALSE 
                        AND 
                    ads.is_visible = TRUE
                        AND
                    ai.is_cover_image = TRUE
            `;
        }else{

            sqlNonAuthQuery = `
                SELECT 
                    ad.id, 
                    ad.title, 
                    to_char(ad.created_at,'DD Month') as date, 
                    ad.description,
                    ad.price,
                    ad.how_status,
                    u.user_type,
                    ads.display_type,
                    ads.display_name,
                    cy.city,
                    ct.county,
                    ai.url as photo
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
                    advert_images ai ON ai.advert_id = ad.id
                WHERE 
                    ad.is_deleted = FALSE 
                        AND 
                    ad.is_visible = TRUE 
                        AND 
                    u.is_deleted = FALSE 
                        AND 
                    ads.is_visible = TRUE
                        AND
                    ai.is_cover_image = TRUE
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
                ad.how_status, 
                u.id as userId, 
                u.fullname,
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
                (ad.is_deleted = FALSE AND ad.is_visible = TRUE) 
            AND 
                (u.is_deleted = FALSE AND ads.is_visible = TRUE) AND ad.id = $1`;

        const data = await pool.query(sqlQuery, [advert_id]); 
        const advertDetail = data.rows[0];

        if(advertDetail.length < 1){
            throw new CustomError(404, "veri bulunamadı"); 
        }
        const imagesQuery = `
            SELECT
                images_id,
                url,
                path,
                width,
                height,
                is_cover_image
            FROM
                advert_images
            WHERE
                advert_id = $1
        `
        const imagesResponse = await pool.query(imagesQuery, [advert_id]);
        const imagesResult = imagesResponse.rows;

        if(imagesResult.length > 0){
            advertDetail['photo'] = imagesResult
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
    const how_status = req.body.how_status;
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

        if (!how_status) {
            throw new CustomError(400, "how_status alanını belirtmelisiniz.");
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

        const insertQuery = `
            INSERT INTO adverts 
                (title, 
                description, 
                user_id, 
                how_status, 
                price, 
                city_id, 
                county_id) 
            VALUES
                ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *
            `;
        const values = [title, description, user_id, how_status, price, city_id, county_id];

        const status = await pool.query(insertQuery, values);
        const advert_id = status.rows[0].id;

        const advertImagesResponse = await Image.uploadMultipleImages(advertImages, 'members/' + email  + '/adverts/' + advert_id + '/' , title);

        for(const item of advertImagesResponse){
            const imageInsertQuery = `
                INSERT INTO advert_images
                    (url, path, width, height, advert_id) 
                VALUES
                    ($1, $2, $3, $4, $5) 
            `;
            const values = [item.url, item.path, item.width, item.height, advert_id];
            await pool.query(imageInsertQuery, values);
        }
       
        return res.status(201).json({ 'success': 'true' , 'advert_id' : advert_id}) 
    }catch (err){
        next(err)
    }
}

exports.getMyAdvertDetail = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser')
    const currentUser = JSON.parse(getRedisData);

    const userId = currentUser?.user_id;     
    const advert_id = req.params.advert_id; 
    
    try {
        const advertHasSqlQuery = `
            SELECT
                ad.id,
                ad.user_id
            FROM
                adverts ad
            WHERE
                ad.id = $1
            AND
                ad.user_id = $2
        `;

        const advertHasResult = await pool.query(advertHasSqlQuery, [advert_id, userId]); 
        const advertHasData = advertHasResult.rows

        if(advertHasData.length < 1){
            throw new CustomError(404, "veri bulunamadı"); 
        }

        const advertSqlQuery = `
            SELECT 
                ad.id, 
                ad.title, 
                ad.description,
                ad.price, 
                ad.how_status, 
                cy.id as city_id, 
                ct.id as county_id,
                CASE WHEN COUNT(aim.images_id) > 0 THEN
                    jsonb_agg (
                        jsonb_build_object (
                            'image_id', aim.images_id,
                            'url', aim.url,
                            'path', aim.path,
                            'is_cover_image', aim.is_cover_image
                        )
                    )
                ELSE
                    jsonb_build_array()
                END as images
            FROM 
                adverts ad 
            LEFT JOIN 
                users u ON ad.user_id = u.id
            LEFT JOIN 
                cities cy ON cy.id = ad.city_id 
            LEFT JOIN 
                counties ct ON ct.id = ad.county_id 
            LEFT JOIN
				advert_images aim ON aim.advert_id = ad.id
            WHERE 
                (ad.is_deleted = FALSE AND ad.is_visible = TRUE) 
            AND 
                u.id = ad.user_id
            AND 
                ad.id = $1
            GROUP BY
				ad.id, cy.id, ct.id
        `;

        const data = await pool.query(advertSqlQuery, [advert_id]); 
        const advertDetail = data.rows[0];

        return res.status(200).json(advertDetail);

    } catch(err) {
        next(err); 
    }
}

exports.putAdvertEdit =  async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser');
    const parseUser = JSON.parse(getRedisData);

    const user_id = parseUser.user_id;
    const email =  parseUser.username;

    const advertId = req.params.advert_id;
    const title = req.body.title;
    const description = req.body.description;
    const how_status = req.body.how_status;
    const price = req.body.price;
    const city_id = req.body.city_id;
    const county_id = req.body.county_id;
    const advertImages = req.files;
    const deletedImages = JSON.parse(req.body.old_images);
    const coverImageId = req.body.cover_image_id;

    try {
        if (!advertId || advertId == '') {
            throw new CustomError(403, "advertId alanını belirtmelisiniz.");
        }
        if (!title || title == '') {
            throw new CustomError(403, "title alanını belirtmelisiniz.");
        }
        if (!description || description == '') {
            throw new CustomError(403, "description alanını belirtmelisiniz.");
        }
        if (!how_status || how_status == '') {
            throw new CustomError(403, "how_status alanını belirtmelisiniz.");
        } 
        if (!price || price == '') {
            throw new CustomError(403, "price alanını belirtmelisiniz.");
        }
        if (!city_id || city_id == '') {
            throw new CustomError(403, "city_id alanını belirtmelisiniz.");
        }
        if (!county_id || county_id == '') {
            throw new CustomError(403, "county_id alanını belirtmelisiniz.");
        }
        
        const selectQuery = `
            SELECT 
                id
            FROM
                adverts
            WHERE
                id = $1
            AND
                is_deleted = FALSE
        `
        const selectResponse = await pool.query(selectQuery, [advertId]);
        const selectResult = selectResponse.rows[0];

        if(!selectResult){
            throw new CustomError(204, "bulunamadı");
        }
        
        const advertImagesResponse = await Image.uploadMultipleImages(advertImages, 'members/' + email  + '/adverts/' + advertId + '/' , title);

        for(const item of advertImagesResponse){
            const imageInsertQuery = `
                INSERT INTO advert_images
                    (url, path, width, height, advert_id, is_cover_image) 
                VALUES
                    ($1, $2, $3, $4, $5, $6) 
            `;
            const values = [
                item.url, 
                item.path, 
                item.width, 
                item.height, 
                advertId, 
                coverImageId == 'undefined' && advertImagesResponse[0].path == item.path ? true : false 
            ];
            await pool.query(imageInsertQuery, values);
           
        }

        const deletedOldImage = async(imageId: number ,path: string) => {
            await Image.removeOldImage(path);

            // image delete from database
            const imageDeleteQuery = `
                DELETE FROM
                    advert_images
                WHERE
                    images_id = $1
            `
            await pool.query(imageDeleteQuery, [imageId])
        }

        if(deletedImages.length !== 0){
            type coinsCardType = {
                path?: string,
                image_id?: number
            }

            deletedImages.map((item : coinsCardType)  => {
                deletedOldImage(item.image_id!, item.path!)
            }); 
        }
  
        const updateQuery = `
            UPDATE
                adverts
            SET
                title = $1,
                description = $2,
                price = $3,
                city_id = $4,
                county_id = $5,
                how_status = $6
            WHERE
                id = $7
        `;
        const updateValues = [title, description, price, city_id, county_id, how_status, advertId]
        await pool.query(updateQuery, updateValues);

        const coverImageQuery = `
            UPDATE
                advert_images
            SET
                is_cover_image = $1
            WHERE
                images_id = $2
        `;

        if(coverImageId !== 'undefined'){
            const updateValues = [true, coverImageId ]
            await pool.query(coverImageQuery, updateValues);
        }

        return res.status(200).json({'success' : true})
    }
    catch (err) {
        next(err);
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

exports.getMyFavoriteAdvert = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser')
    const currentUser = JSON.parse(getRedisData);

    const userId = currentUser?.user_id;

    try {
        const sqlQuery = `
            SELECT 
            ad.id, 
            ad.title, 
            to_char(ad.created_at,'DD Month') as date, 
            ad.description,
            ad.images,
            ad.price,
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
            ad.is_visible = TRUE 
                AND 
            u.is_deleted = FALSE 
                AND 
            ads.is_visible = TRUE
                AND
            adf.user_id = $1
        `;

        const responseData = await pool.query(sqlQuery, [userId]);
        const getData = responseData.rows;

        if(getData.length == 0){
            throw new CustomError(404); 
        }

        return res.status(200).json({getData});
    }
    catch(err){

    }
}

exports.getMyAdvert = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser')
    const currentUser = JSON.parse(getRedisData);

    const userId = currentUser?.user_id;

    try {
        const sqlQuery = `
            SELECT
                ad.id,
                ad.title,
                ad.images,
                ad.price,
                ad.is_visible,
                COUNT(adf.favorite_id) as likes,
                STRING_AGG(CASE WHEN aim.is_cover_image = TRUE THEN aim.url ELSE NULL END, '') AS is_cover_image
            FROM
                adverts ad
            LEFT JOIN
                advert_favorites adf
            ON
                adf.advert_id = ad.id
            LEFT JOIN
				advert_images aim
			ON
				ad.id = aim.advert_id
            WHERE
                ad.user_id = $1
            AND
                is_deleted = FALSE
            GROUP BY
				ad.id
        `;

        const response = await pool.query(sqlQuery, [userId]);

        const result = response.rows;

        res.status(200).json(result);

    }
    catch (err){

    }

}

exports.patchSettingAdvert = async function (req: Request, res: Response, next: NextFunction) {
    const advert_id = req.params.advert_id;
    const path = req.body.path;
    const op = req.body.op;
    const value = req.body.value;

    try {
        if(path == "has_advert_visible" && op == 'replace') {
            const visibleQuery = `
                UPDATE
                    adverts
                SET
                    is_visible = $1
                WHERE
                    id = $2
            `;
            await pool.query(visibleQuery, [value, advert_id]);

            return res.status(200).json({'success' : true})
        }
        else if(path == "has_advert_remove" && op == 'remove'){
            const visibleQuery = `
                UPDATE
                    adverts
                SET
                    is_deleted = $1
                WHERE
                    id = $2
            `;
            await pool.query(visibleQuery, [value, advert_id]);

            return res.status(200).json({'success' : true})
        }else{
            throw new CustomError(204);
        }
    }
    catch (err)
    {
        next(err)
    }
}
