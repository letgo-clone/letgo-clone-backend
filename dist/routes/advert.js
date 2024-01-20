"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const advertController = require("../controllers/advert");
const multer = require('../helpers/multer');
const verifyJWT = require('../middleware/verifyJWT');
/**
 * @openapi
 * /advert/categories:
 *  get:
 *     tags:
 *     - Advert API
 *     summary: Gets categories data
 *     responses:
 *       200:
 *         description: success
 */
router.get('/categories', advertController.getCategories);
/**
 * @openapi
 * /advert/actual:
 *  get:
 *     tags:
 *     - Advert API
 *     summary: Receives current advertisements
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/actual", advertController.getActualAdvert);
/**
 * @openapi
 * /advert/actual/{detail}:
 *  get:
 *     tags:
 *     - Advert API
 *     summary: Get a single advert by the advert_id
 *     parameters:
 *      - name: detail
 *        in: path
 *        description: The id of the advert
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *        description: Not found
 */
router.get("/actual/:detail", advertController.getAdvertDetail);
// Users advert api's
/**
 * @openapi
 * /advert/list:
 *  get:
 *     tags:
 *     - Advert API
 *     summary: gets user advert
 *     description: You must be logged in
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *        description: Unauthorized
 *  post:
 *     tags:
 *     - Advert API
 *     summary: Create a new advert
 *     description: You must be logged in
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schema/Advert'
 *     responses:
 *       201:
 *         description: Advert created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/advertResponse'
 *           example:
 *             "success": "true"
 *             "advert_id": "1200305921"
 *       400:
 *          description: Bad Request
 *       401:
 *          description: Unauthorized
 */
router.get('/list', verifyJWT, advertController.getMyAdvert);
router.post('/list', verifyJWT, multer.image_upload.array('photo'), advertController.postAdvert, multer.body_parse.any());
/**
 * @openapi
 * '/advert/list/{advert_id}':
 *  get:
 *     tags:
 *     - Advert API
 *     summary: Gets advert data for editing,
 *     description: You must be logged in
 *     parameters:
 *      - name: advert_id
 *        in: path
 *        description: The id of the advert
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Advert not found
 *       401:
 *          description: Unauthorized
 *  put:
 *     tags:
 *     - Advert API
 *     summary: Update a single advert
 *     description: You must be logged in
 *     parameters:
 *      - name: advert_id
 *        in: path
 *        description: The id of the advert
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schema/Advert'
 *     responses:
 *       201:
 *         description: Advert created
 *       400:
 *          description: Bad Request
 *       401:
 *          description: Unauthorized
 *       403:
 *         description: Forbidden
 *  patch:
 *     tags:
 *     - Advert API
 *     summary: Advert settings,
 *     description: You must be logged in
 *     parameters:
 *      - name: advert_id
 *        in: path
 *        description: The id of the advert
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schema/advertSetting'
 *     responses:
 *       204:
 *         description: Success
 */
router.get('/list/:advert_id', verifyJWT, advertController.getMyAdvertDetail);
router.put('/list/:advert_id', verifyJWT, multer.image_upload.array('photo'), advertController.putAdvertEdit, multer.body_parse.any());
router.patch('/list/:advert_id', verifyJWT, multer.body_parse.any(), advertController.patchSettingAdvert);
/**
 * @openapi
 * /advert/location:
 *  get:
 *     tags:
 *     - Advert API
 *     summary: Gets city data
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/location', advertController.getLocationCity);
/**
 * @openapi
 * /advert/location/{city_id}:
 *  get:
 *     tags:
 *     - Advert API
 *     summary: Get a single city by the city_id
 *     parameters:
 *      - name: city_id
 *        in: path
 *        description: The id of the city
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *        description: Not found
 */
router.get('/location/:city_id', advertController.getCountyForCity);
/**
 * @openapi
 * '/advert/favorite/{advert_id}':
 *  patch:
 *     tags:
 *     - Advert API
 *     summary: Advert settings,
 *     description: You must be logged in
 *     parameters:
 *      - name: advert_id
 *        in: path
 *        description: The id of the advert
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schema/advertFavorite'
 *     responses:
 *       204:
 *         description: Success
 */
router.patch('/favorite/:advert_id', verifyJWT, multer.body_parse.array(), advertController.patchFavoriteAdvert);
/**
 * @openapi
 * /advert/favorite/list:
 *  get:
 *     tags:
 *     - Advert API
 *     summary: Gets favorite advert,
 *     description: You must be logged in
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get('/favorite/list', verifyJWT, advertController.getMyFavoriteAdvert);
module.exports = router;
