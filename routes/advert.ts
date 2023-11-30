import express, { Express, Request, Response } from 'express';
const router = express.Router();

const advertController = require("../controllers/advert");
const multer = require('../helpers/multer');

const verifyJWT = require('../middleware/verifyJWT');

router.get("/actual", advertController.getActualAdvert);
router.get("/actual/:detail", advertController.getAdvertDetail);

router.post('/actual', verifyJWT, multer.image_upload.single('photo'), advertController.postAdvert, multer.body_parse.any());

router.get('/location', advertController.getLocationCity);
router.get('/location/:city_id', advertController.getCountyForCity);

module.exports = router;