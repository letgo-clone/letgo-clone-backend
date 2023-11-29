import express, { Express, Request, Response } from 'express';
const router = express.Router();

const memberController = require("../controllers/member");
const multer = require('../helpers/multer');

router.get("/session", memberController.get_member);

module.exports = router;