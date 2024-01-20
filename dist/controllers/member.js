"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const bcrypt = require("bcrypt");
const redis = require('../helpers/redis');
const pool = require('../helpers/postgre');
const Image = require('../helpers/uploadImage');
const CustomError = require('../errors/CustomError');
exports.get_member = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const getRedisData = yield redis.RedisClient.get('currentUser');
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
                u.id,
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
            const data = yield pool.query(sqlQuery, [email]);
            const user = data.rows[0];
            if (!user) {
                throw new CustomError(401, "The user not found", 'access_denied');
            }
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.put_member = function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const getRedisData = yield redis.RedisClient.get('currentUser');
        const currentUser = JSON.parse(getRedisData);
        let fullname = req.body.fullname;
        let email = req.body.email;
        let about = req.body.about;
        let phone_number = req.body.phone_number;
        const password = req.body.password;
        const currentPass = req.body.current_pass;
        const photo = req.files;
        try {
            if (!currentUser || currentUser == '') {
                throw new CustomError(403);
            }
            const current_email = currentUser.username;
            const user_id = currentUser.user_id;
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
            const statusOldData = yield pool.query(oldDataQuery, [current_email]);
            const responseOldData = statusOldData.rows[0];
            if (!fullname || fullname == '') {
                fullname = responseOldData.fullname;
            }
            if (!email || email == '') {
                email = responseOldData.email;
            }
            if (!phone_number) {
                phone_number = responseOldData.phone_number;
            }
            let hashedPass;
            if (currentPass && currentPass !== '') {
                const passCheck = yield bcrypt.compare(currentPass, responseOldData.password);
                if (passCheck) {
                    hashedPass = yield bcrypt.hashSync(password, 10);
                }
                else {
                    throw new CustomError(404, "Mevcut şifrenizi kontrol ediniz.", 'invalid_grant');
                }
            }
            let selectedPhoto;
            if (photo && photo.length != 0) {
                yield Image.removeOldImage((responseOldData === null || responseOldData === void 0 ? void 0 : responseOldData.photo) ? (_a = responseOldData === null || responseOldData === void 0 ? void 0 : responseOldData.photo) === null || _a === void 0 ? void 0 : _a.path : '');
                const uploadImage = yield Image.uploadMultipleImages(photo, 'members/' + email + '/avatar/', fullname);
                selectedPhoto = JSON.stringify(uploadImage[0]);
            }
            else {
                selectedPhoto = responseOldData.photo;
            }
            const updateQuery = `
            UPDATE
                users
            SET
                fullname = $1,
                email = $2,
                about = $3,
                phone_number = $4,
                password = $5,
                photo = $6
            WHERE
                id = $7
        `;
            const updateValues = [
                fullname,
                email,
                about,
                phone_number,
                hashedPass == undefined ? responseOldData.password : hashedPass,
                selectedPhoto,
                user_id
            ];
            yield pool.query(updateQuery, updateValues);
            return res.status(200).json({ 'success': 'true', photo: selectedPhoto });
        }
        catch (err) {
            next(err);
        }
    });
};
exports.post_member = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fullname = "letgo kullanıcısı";
        const { email, password } = req.body;
        try {
            if (!email || email == '') {
                throw new CustomError(400, "Email alanını belirtmelisiniz", "value_error");
            }
            const oldDataQuery = `
            SELECT 
                email
            FROM
                users
            WHERE
                email = $1
        `;
            const statusOldData = yield pool.query(oldDataQuery, [email]);
            const responseOldData = statusOldData.rows[0];
            if (responseOldData === null || responseOldData === void 0 ? void 0 : responseOldData.email) {
                throw new CustomError(409, "Email adresi kullanılmakta", 'duplicate_email');
            }
            if (!password || password == '') {
                throw new CustomError(400, "password alanını belirtmelisiniz", "value_error");
            }
            const passwordHash = yield bcrypt.hashSync(password, 10);
            const insertUserQuery = `
            INSERT INTO
                users
            (fullname, email, password, user_type)
                VALUES
            ($1, $2, $3, 'CONSUMER')
        `;
            yield pool.query(insertUserQuery, [fullname, email, passwordHash]);
            return res.status(200).json({ 'success': 'true' });
        }
        catch (err) {
            next(err);
        }
    });
};
exports.get_user_info = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.user_id;
        try {
            const userQuery = `
            SELECT
                fullname,
                to_char(created_at,'DD Month') as date,
                photo
            FROM
                users
            WHERE
                id = $1
            AND
                is_deleted = FALSE
        `;
            const userResult = yield pool.query(userQuery, [userId]);
            const userData = userResult.rows[0];
            if (!userData) {
                throw new CustomError(404, "The user not found");
            }
            const advertQuery = `
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
                ai.url as photo,
            CASE
                WHEN adf.favorite_id IS NULL THEN false
                ELSE true END
                AS has_favorite
            FROM
                adverts ad
            LEFT JOIN
                users u ON u.id = ad.user_id
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
                ad.user_id = $1
            AND
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
            const advertResult = yield pool.query(advertQuery, [userId]);
            const advertData = advertResult.rows;
            return res.status(200).json({ user: userData, adverts: advertData });
        }
        catch (err) {
            next(err);
        }
    });
};
