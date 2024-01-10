import express, { Express, Request, Response } from 'express';
const router = express.Router();

const advertController = require("../controllers/advert");
const multer = require('../helpers/multer');

const verifyJWT = require('../middleware/verifyJWT');

router.get('/categories', advertController.getCategories);

router.get("/actual", advertController.getActualAdvert);
router.get("/actual/:detail", advertController.getAdvertDetail);

// Users advert api's
router.get('/list', verifyJWT, advertController.getMyAdvert);
router.patch('/list/:advert_id', verifyJWT, multer.body_parse.any(), advertController.patchSettingAdvert)

router.post('/list', verifyJWT, multer.image_upload.array('photo'), advertController.postAdvert, multer.body_parse.any());
router.get('/list/:advert_id', verifyJWT, advertController.getMyAdvertDetail);
router.put('/list/:advert_id', verifyJWT, multer.image_upload.array('photo'), advertController.putAdvertEdit, multer.body_parse.any());

router.get('/location', advertController.getLocationCity);
router.get('/location/:city_id', advertController.getCountyForCity);

router.patch('/favorite/:advert_id', verifyJWT, multer.body_parse.array(), advertController.patchFavoriteAdvert);
router.get('/favorite/list', verifyJWT, advertController.getMyFavoriteAdvert);

module.exports = router;