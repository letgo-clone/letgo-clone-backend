import express, { Express, Request, Response } from 'express';
const router = express.Router();

const authController = require("../controllers/auth");
const multer = require('../helpers/multer');

router.post("/token", multer.body_parse.array(), authController.handleToken);

module.exports = router;