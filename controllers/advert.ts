import express, { Request, Response, NextFunction } from 'express';
const CustomError = require('../errors/CustomError');

const pool = require('../helpers/postgre');

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