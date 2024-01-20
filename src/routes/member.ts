import express, { Express, Request, Response } from 'express';
const router = express.Router();

const memberController = require("../controllers/member");
const multer = require('../helpers/multer');
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @openapi
 * /account/session:
 *  get:
 *     tags:
 *     - Members
 *     summary: Check member 
 *     description: You must be logged in
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *        description: Unauthorized
 *  put:
 *     tags:
 *     - Members
 *     summary: Edit info member
 *     description: You must be logged in
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schema/PutMember'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *          description: Bad Request
 *       401:
 *          description: Unauthorized
 *       404:
 *          description: Not found
 *  post:
 *     tags:
 *     - Members
 *     summary: Register a user
 *     description: You must be logged in
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schema/PostMember'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *          description: Bad Request
 *       409:
 *          description: Duplicate
 */
router.get("/session", verifyJWT, memberController.get_member);
router.put('/session', verifyJWT, multer.image_upload.array('photo'), memberController.put_member, multer.body_parse.array());
router.post('/session', multer.body_parse.array(), memberController.post_member);

/**
 * @openapi
 * /account/session/{user_id}:
 *  get:
 *     tags:
 *     - Members
 *     summary: Gets profile display data
 *     parameters:
 *      - name: user_id
 *        in: path
 *        description: The id of the member
 *        required: true
 *     description: You must be logged in
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *        description: Not found
 */
router.get('/session/:user_id', memberController.get_user_info);

module.exports = router;