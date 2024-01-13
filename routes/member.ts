import express, { Express, Request, Response } from 'express';
const router = express.Router();

const memberController = require("../controllers/member");
const multer = require('../helpers/multer');

router.get("/session", memberController.get_member);
router.put('/session/user', multer.body_parse.array(), memberController.put_member);
router.post('/session/user', multer.body_parse.array(), memberController.post_member);

router.get('/info/:user_id', memberController.get_user_info);

module.exports = router;