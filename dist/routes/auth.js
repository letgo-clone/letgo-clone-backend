"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController = require("../controllers/auth");
const multer = require('../helpers/multer');
/**
 * @openapi
 * '/oauth/token':
 *  post:
 *     tags:
 *     - OAuth 2.0
 *     summary: handle token
 *     description: You must be logged in
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schema/Auth'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/authResponse'
 *           example:
 *             "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpcmF0eWlsZGl6bmV0QGdtYWlsLmNvbSIsImlhdCI6MTcwNTc1NDg3NSwiZXhwIjoxNzA1NzYyMDc1fQ.XnS8HHA7f7hm594gZoY5VG0LrtSpgAvWpZYt6dkDXYY"
 *             "expires_in": 7200
 *             "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpcmF0eWlsZGl6bmV0QGdtYWlsLmNvbSIsImlhdCI6MTcwNTc1NDg3NSwiZXhwIjoxNzA1NzYyMDc1fQ._2EnS0J0jn3_QrIk6LJqGetP1nfstsNyaN_x7tHpdIg"
 *             "token_type": "Bearer"
 *       400:
 *          description: Bad Request
 *       401:
 *          description: Unauthorized
 */
router.post("/token", multer.body_parse.array(), authController.handleToken);
/**
 * @openapi
 * /oauth/logout:
 *  get:
 *     tags:
 *     - OAuth 2.0
 *     summary: Logout
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/logout", multer.body_parse.array(), authController.handleLogout);
module.exports = router;
