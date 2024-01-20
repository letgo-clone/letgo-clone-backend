"use strict";
/**
 * @openapi
 * components:
 *   schema:
 *     Advert:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - how_status
 *        - price
 *        - city_id
 *        - county_id
 *        - main_category_id
 *        - sub_category_id
 *        - image
 *       properties:
 *         title:
 *           type: string
 *           default: "İphone X"
 *         description:
 *           type: string
 *           default: "Faturası duruyor"
 *         how_status:
 *           type: string
 *           default: "Yeni gibi"
 *         price:
 *           type: number
 *           default: 90050
 *         city_id:
 *           type: number
 *           default: 34
 *         county_id:
 *           type: number
 *           default: 430
 *         main_category_id:
 *           type: number
 *           default: 2
 *         sub_category_id:
 *           type: number
 *           default: 8
 *         image:
 *           type: file
 *           in: fromData
 *     advertSetting:
 *       type: object
 *       required:
 *        - path
 *        - op
 *        - value
 *       properties:
 *         path:
 *           type: string
 *           default: "has_advert_visible"
 *         op:
 *           type: string
 *           default: "replace"
 *         value:
 *           type: boolean
 *           default: true
 *     advertFavorite:
 *       type: object
 *       required:
 *         - path
 *         - op
 *       properties:
 *          path:
 *            type: string
 *            default: "has_advert_favorite"
 *          op:
 *            type: string
 *            default: "add"
 *     advertResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: string
 *         advert_id:
 *           type: string
 *
 */ 
