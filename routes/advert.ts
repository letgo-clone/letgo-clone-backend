import express, { Express, Request, Response } from 'express';
const router = express.Router();

const advertController = require("../controllers/advert");
const multer = require('../helpers/multer');

router.get("/actual", advertController.getActualAdvert);

module.exports = router;