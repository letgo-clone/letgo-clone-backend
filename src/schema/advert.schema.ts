/**
 * @openapi
 * components:
 *   schema:
 *     Auth:
 *       type: object
 *       required:
 *        - client_id
 *        - client_secret
 *        - grant_type
 *        - username
 *        - password
 *       properties:
 *         client_id:
 *           type: string
 *         client_secret:
 *           type: string
 *         grant_type:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *     authResponse:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *         expires_in:
 *           type: number
 *         refresh_token:
 *           type: string
 *         token_type:
 *           type: string
 *
 */