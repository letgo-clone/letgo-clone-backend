"use strict";
/**
 * @openapi
 * components:
 *   schema:
 *     PutMember:
 *       type: object
 *       required:
 *        - fullname
 *        - email
 *        - password
 *        - currentPass
 *        - photo
 *       properties:
 *         fullname:
 *           type: string
 *           default: "Fırat Yıldız"
 *         email:
 *           type: string
 *           default: "name@mail.com"
 *         about:
 *           type: string
 *           default: ""
 *         phone_number:
 *           type: number
 *           default: 5559695555
 *         password:
 *           type: string
 *         currentPass:
 *           type: string
 *         photo:
 *           type: file
 *           in: fromData
 *     PostMember:
 *       type: object
 *       required:
 *        - fullname
 *        - email
 *        - password
 *       properties:
 *         fullname:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */ 
