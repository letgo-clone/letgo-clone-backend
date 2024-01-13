import express, { Express, Request, Response } from 'express';
const router = express.Router();

const memberController = require("../controllers/member");
const multer = require('../helpers/multer');
const verifyJWT = require('../middleware/verifyJWT');

router.get("/session", verifyJWT, memberController.get_member);
router.put('/session/user', verifyJWT, multer.body_parse.array(), memberController.put_member);
router.post('/session/user', multer.body_parse.array(), memberController.post_member);

router.get('/info/:user_id',verifyJWT, memberController.get_user_info);

module.exports = router;